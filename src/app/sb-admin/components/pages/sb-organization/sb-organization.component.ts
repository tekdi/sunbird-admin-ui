import { Component, OnDestroy } from '@angular/core';
import { OrganizationDetail, SearchFilterValue } from 'src/app/sb-admin/interfaces/OrganizationDetail';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Subscription, } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrEditOrgComponent } from './add-or-edit-org/add-or-edit-org.component';
import { MessageService } from 'primeng/api';
import { I18NextPipe } from 'angular-i18next';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { UserCountService } from 'src/app/sb-admin/service/user-count.service';
import { AddSubOrgComponent } from './add-sub-org/add-sub-org.component';

@Component({
  selector: 'app-sb-organization',
  templateUrl: './sb-organization.component.html',
  styleUrls: ['./sb-organization.component.scss']
})

export class SbOrganizationComponent implements OnDestroy {
  organizationDetail: OrganizationDetail[] = [];
  loading: boolean = true;
  private subscription!: Subscription;
  rows: number = 10;
  orgCount: number = 0;
  first: number = 0;
  filteredValue = SearchFilterValue;
  rowsPerPageOptions: number[] = [10, 20, 30];
  timeout: any = null;
  visible: boolean = false;
  addOrgDialog = {
    header: this.i18nextPipe.transform('ADD_ORGANIZATION'),
    width: '40%',
    contentStyle: {
      overflow: 'auto'
    }
  };
  addSubOrgDialog = {
    header: this.i18nextPipe.transform('ADD_SUB_ORGANIZATION_HEADER'),
    width: '40%',
    contentStyle: {
      overflow: 'auto'
    }
  };
  isAdmin!: any;

  constructor(private orgList: OrganizationListService, private userService: UserService,
    private userCountService: UserCountService, public dialogService: DialogService,
    public ref: DynamicDialogRef, private messageService: MessageService, private i18nextPipe: I18NextPipe) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem("isAdmin")
    this.getTotalOrgCount();
   
  }

  getAllOrg(event: any) {
    let filters = this.filteredValue;
    Object.keys(filters).forEach(key => {
      if (!filters[key]) {
        delete filters[key]
      }
    });
    let offset = event.first
    offset = isNaN(offset) ? 0 : offset;
    const body = {
      request: {
        filters: filters,
        limit: event?.rows || 10,
        offset: offset,
      }
    }
    return this.orgList.getAllOrgSubOrg(body).subscribe((data: any) => {
      this.organizationDetail = data?.result?.response?.content;
      this.loading = false;
      return this.organizationDetail;
    },
      (error: any) => {
        this.loading = false;
      }
    )
  }

  onSearch(event: any): void {
    let $this = this;
    this.first = 0
    if (event.target.value.length > 3) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.getAllOrg(event);
      }, 2000);
    }
    else if (event.target.value.length === 0) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.getAllOrg(event);
      }, 1000);
    }
  }

  getTotalOrgCount() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
      }
    }
    this.subscription = this.orgList.getAllOrgSubOrg(body).subscribe(
      (data: any) => {
        this.orgCount = data?.result?.response?.count;
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: error?.error?.params?.errmsg })
      }
    );
  }

  addOrg() {
    this.ref = this.dialogService.open(AddOrEditOrgComponent,
      {
        header: this.i18nextPipe.transform('ADD_ORGANIZATION'),
        data: { mode: 'Add' },
        width: '40%',
        contentStyle: {
          overflow: 'auto'
        }
      }
    );
    this.ref.onClose.subscribe((newOrganizationData: any) => {
      if (newOrganizationData) {
        this.organizationDetail.unshift(newOrganizationData);
        this.orgCount = this.organizationDetail.length;
        this.messageService.add({ severity: 'success', summary: this.i18nextPipe.transform('ADD_ORGANIZATION_SUCCESSFULLY') })
      }
    });
  }

  editOrganization(organization: any) {
    this.ref = this.dialogService.open(AddOrEditOrgComponent, {
      header: this.i18nextPipe.transform('EDIT_ORGANIZATION_HEADER'),
      data: { mode: 'Edit', organization },
      width: '40%'
    });
    this.ref.onClose.subscribe((updatedData: any) => {
      if (updatedData) {
        this.messageService.add({
          severity: 'success', summary: this.i18nextPipe.transform('EDIT_ORGANIZATION_UPDATE_STATUS')
        })
        const index = this.organizationDetail.findIndex((org) => org.id === updatedData.organisationId);
        if (index !== -1) {
          this.organizationDetail[index].orgName = updatedData.orgName;
          this.organizationDetail[index].description = updatedData.description
        }
      }
    })
  }

  addSubOrg() {
    this.ref = this.dialogService.open(AddSubOrgComponent, this.addSubOrgDialog);
    this.ref.onClose.subscribe((newSubOrgData: any) => {
      if (newSubOrgData) {
        this.messageService.add({ severity: 'success', summary: this.i18nextPipe.transform('ADD_SUB_ORGANIZATION_SUCCESSFULLY') })
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


