import { Component, OnDestroy } from '@angular/core';
import { OrganizationDetail } from './OrganizationDetail';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrEditOrgComponent } from './add-or-edit-org/add-or-edit-org.component';
import { MessageService, Message } from 'primeng/api';
import { I18NextPipe } from 'angular-i18next';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { map } from 'rxjs';
import { UserCountService } from 'src/app/sb-admin/service/user-count.service';

@Component({
  selector: 'app-sb-organization',
  templateUrl: './sb-organization.component.html',
  styleUrls: ['./sb-organization.component.scss']
})

export class SbOrganizationComponent implements OnDestroy {
  organizationDetail: OrganizationDetail[] = [];
  loading: boolean = true;
  private subscription: Subscription | any;
  globalFilterFields: string[] = ['organizationName', 'channel', 'id'];
  rows: number = 10;
  orgCount: number = 0;
  TotaluserCount: number = 0;
  TotalsubOrgCount: number = 0;
  messages: Message[] = [];

  constructor(private orgList: OrganizationListService, private userService: UserService,
    private userCountService: UserCountService, public dialogService: DialogService,
    public ref: DynamicDialogRef, private messageService: MessageService, private i18nextPipe: I18NextPipe) { }

  ngOnInit() {
    this.getTotalOrgCount();
    this.getTotalUserCount();
    this.getTotalSubOrgCount();
    this.getAllOrg().subscribe((data: any) => {
      if (data && data.length > 0) {
        this.getSubOrgCountOfEachOrg(data);
        this.getUserCountOfEachOrg(data);
      }
    });
  }

  getAllOrg() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
      }
    }
    return this.orgList.getAllOrgSubOrg(body).pipe(
      map((data: any) => {
        this.organizationDetail = data.result.response.content;
        this.organizationDetail.sort((startDate: any, endDate: any) =>
          new Date(endDate.createdDate).getTime() - new Date(startDate.createdDate).getTime());
        return this.organizationDetail;
      },
        (error: any) => {
          console.log(error);
          this.loading = false;
        }
      )
    );
  }

  getSubOrgCountOfEachOrg(orgDetail: any) {
    orgDetail.map((org: any) => {
      const body = {
        "request": {
          "filters": {
            "isRootOrg": false,
            "isTenant": false,
            "channel": org.channel

          },
          "sortBy": {
            "createdDate": "Desc"
          }
        }
      }
      this.orgList.getAllOrgSubOrg(body).subscribe((subOrgCount: any) => {
        org.subOrgCount = subOrgCount.result.response.count;
      })
    },
      (error: any) => {
        console.log(error);
        this.loading = false;
      })
  }

  getUserCountOfEachOrg(orgDetail: any): void {
    orgDetail.map((org: any) => {
      const body = {
        "request": {
          "filters": {
            "rootOrgId": org.id
          }
        }
      };
      this.userCountService.getUserCountOfaTenant(body).subscribe((counttenant: any) => {
        org.userCount = counttenant?.result?.response?.count;
        if (orgDetail[orgDetail.length - 1].id === org.id) {
          this.loading = false;
        }
      });
    },
      (error: any) => {
        console.log(error);
        this.loading = false;
      });
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
        this.orgCount = data.result.response.count;
      },
      (error: any) => {
        console.log(error);
      });
  }

  getTotalSubOrgCount() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": false
        }
      }
    }
    this.orgList.getAllOrgSubOrg(body).subscribe((response: any) => {
      this.TotalsubOrgCount = response.result.response.count;
    },
      (error: any) => {
        console.log(error);
      })
  }

  getTotalUserCount() {
    const body = {
      "request": {
        "filters": {
        }
      }
    }
    this.userService.loadUserList(body).subscribe((response: any) => {
      this.TotaluserCount = response.result.response.count;
    },
      (error: any) => {
        console.log(error);
      })
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
      data: { mode: 'Edit', organization, },
      width: '40%',
      header: 'Edit Organization'
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


