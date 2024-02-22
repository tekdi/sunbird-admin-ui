import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, Message } from 'primeng/api';
import { I18NextPipe } from 'angular-i18next';

import { OrganizationDetail, SearchFilterValue } from 'src/app/sb-admin/interfaces/OrganizationDetail';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { UserCountService } from 'src/app/sb-admin/service/user-count.service';

@Component({
  selector: 'app-frameworkmanage',
  templateUrl: './frameworkmanage.component.html',
  styleUrls: ['./frameworkmanage.component.scss']
})
export class FrameworkManageComponent implements OnInit, OnDestroy {
  organizationDetail: OrganizationDetail[] = [];
  loading = true;
  rows = 10;
  orgCount = 0;
  first = 0;
  filteredValue = SearchFilterValue;
  rowsPerPageOptions: number[] = [10, 20, 30];
  timeout: any = null;
  visible = false;
  userDialog = false;
  submitted = false;
  NodataDialog = false;
  orgId: any;
  frameworks: any[] = [];
  messages: Message[] = [];
  editFrameworkForm!: FormGroup;
  selectedFramework = { name: '', description: '' };
  optionLabel: any;
  optionValue: any;
  frameworksName: any;
  private subscription: Subscription | undefined;
  searchTerm: string = '';
  constructor(
    private orgList: OrganizationListService,
    private userService: UserService,
    private userCountService: UserCountService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private i18nextPipe: I18NextPipe,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTotalOrgCount();
    this.editFrameworkForm = this.fb.group({
      frameworkNameDD: [''],
      frameworkName: ['', Validators.required],
      frameworkDesc: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getAllOrg(event: any) {
    const filters = { ...this.filteredValue };
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    if (this.searchTerm) {
      filters['channel'] = this.searchTerm;
    }
    const offset = isNaN(event.first) ? 0 : event.first;
    const body = {
      request: {
        filters: filters,
        limit: event?.rows || 10,
        offset: offset,
      },
    };
  
    this.orgList.getAllOrgSubOrg(body).subscribe(
      (data: any) => {
        this.organizationDetail = data?.result?.response?.content;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }
  

  onSearch(event: any): void {
    this.first = 0;
    this.searchTerm = event.target.value.trim();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getAllOrg(event);
    }, this.searchTerm.length > 3 ? 2000 : 1000);
  }

  getTotalOrgCount() {
    const body = {
      request: {
        filters: {
          isRootOrg: true,
        },
      },
    };

    this.subscription = this.orgList.getAllOrgSubOrg(body).subscribe(
      (data: any) => {
        this.orgCount = data?.result?.response?.count;
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: error?.error?.params?.errmsg,
        });
      }
    );
  }

  editFramework(event: any) {
    this.orgId = event.id;
    this.getFrameworkbyChannel(this.orgId);
  }

  getFrameworkbyChannel(org: any): void {
    this.subscription = this.userService.getChannel(this.orgId).subscribe(
      (response: any) => {
        this.frameworks = response?.result?.channel?.frameworks;
        if (this.frameworks === undefined) {
          this.NodataDialog = true;
          this.userDialog = false;
        } else {
          this.userDialog = true;
        }
      },
      (error) => {
        this.messages = [];
        this.messageService.add({
          severity: 'error',
          detail: error?.error?.params?.errmsg,
        });
      }
    );
  }

  getFramework(org: any): void {    
    this.subscription = this.userService.getFramework(org).subscribe(
      (response: any) => {
        this.frameworks = Array.isArray(response?.result?.framework?.frameworks) ? response?.result?.framework?.frameworks : [response?.result?.framework];
        if (this.frameworks === undefined) {
          this.NodataDialog = true;
          this.userDialog = false;
        } else {
          this.userDialog = true;
        }
      },
      (error) => {
        this.messages = [];
        this.messageService.add({
          severity: 'error',
          detail: error?.error?.params?.errmsg,
        });
      }
    );
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
    this.editFrameworkForm.reset();
  }

  addframework() {
    this.NodataDialog = false;
    this.router.navigate(['/pages/framework']);
  }

  saveEditFramework() {
    this.submitted = true;
    this.userDialog = false;
    const updatedFormValues = { ...this.editFrameworkForm.value };
    const body = {
      "request": {
        "framework": {
          "name": updatedFormValues.frameworkName,
          "description": updatedFormValues.frameworkDesc,
          "channels": [{ "identifier": this.orgId }]
        }
      }
    };
    this.subscription = this.userService.updateFramework(body, updatedFormValues.frameworkNameDD).subscribe(
      (response) => this.handleFrameworkUpdateSuccess(response),
      (error) => this.handleFrameworkUpdateError(error)
    );
  }

  handleFrameworkUpdateSuccess(response: any): void {
    this.messages = [];
    this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('FRAMEWORK_UPDATED') });
    this.editFrameworkForm.reset(); 
    this.selectedFramework = { name: '', description: '' }; 
    this.filteredValue = null;
    this.hideDialog(); 
    location.reload();
  }

  handleFrameworkUpdateError(error: any): void {
    this.submitted = false;
    this.messages = [];
    this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
  }

 onSearch1(event: any) {
    this.frameworksName=event;
    this.getFrameworkbyChannel(this.orgId);
    this.selectedFramework = this.frameworks.find(
      (org) => org.identifier === event
    );
  }
}
