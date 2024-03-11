import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  private subscription!: Subscription;
  createFramework!: FormGroup;
  submitted = false;
  messages: Message[] = [];
  organizations: any[] = [];
  selectedOrg: any[] = [];
  first = 0;
  orgId: any;
  frameworks: any[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe,
  ) {}

  ngOnInit() {
    this.initializeAddForm();
    this.getOrganizations();
  }

  initializeAddForm() {
    this.createFramework = this.formBuilder.group({
      filteredValue: [null, Validators.required],
      frameworkName: ['', Validators.required],
      frameworkCode: ['', Validators.required],
      frameworkDesc: ['', Validators.required],
      frameworkNameDD: [],
    });
  }

  saveFramework() {
    this.submitted = true;
    const updatedFormValues = { ...this.createFramework.value };
    const body = this.createRequestBody(updatedFormValues);

    this.userService.saveFramework(body).subscribe(
      (response) => this.handleFrameworkSaveSuccess(response),
      (error) => this.handleFrameworkSaveError(error)
    );
  }

  createRequestBody(updatedFormValues: any): any {
    return {
      "request": {
        "framework": {
          "name": updatedFormValues.frameworkName,
          "code": updatedFormValues.frameworkCode,
          "description": updatedFormValues.frameworkDesc,
          "type": "K-12",
          "channels": [
            {
              "identifier": this.orgId,
            },
          ],
        },
      },
    };
  }

  handleFrameworkSaveSuccess(response: any): void {
    this.messages = [];
    this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('FRAMEWORK_ADDED') });
    this.createFramework.reset();
   
    this.submitted = false;
  }

  handleFrameworkSaveError(error: any): void {
    this.submitted = false;
    this.messages = [];
    this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
  }

  getOrganizations() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true,
        },
      },
    };

    this.subscription = this.userService.getOrganizations(body).subscribe(
      (response: any) => {
        this.organizations = response?.result?.response?.content;
      },
      (error) => {
        this.handleFrameworkSaveError(error);
      }
    );
  }

  getFramework(org: any): void {
    this.subscription = this.userService.getChannel(org).subscribe(
      (response: any) => {
        this.frameworks = response?.result?.channel?.frameworks;
      },
      (error) => {
        this.handleFrameworkSaveError(error);
      }
    );
  }

  onSearch(event: any): void {
    this.first = 0;
    const selectedOrganization = this.organizations.find((org) => org.orgName === event.value);
    if (selectedOrganization) {
      this.orgId = selectedOrganization.id;
      this.getFramework(this.orgId);
    }
  }

  onSearch1(event: any): void {
    this.first = 0;
  }
}
