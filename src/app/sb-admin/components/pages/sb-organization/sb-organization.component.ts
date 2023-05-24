import { Component, OnDestroy, ViewChild } from '@angular/core';
import { OrganizationDetail } from './OrganizationDetail';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrEditOrgComponent } from './add-or-edit-org/add-or-edit-org.component';


@Component({
  selector: 'app-sb-organization',
  templateUrl: './sb-organization.component.html',
  styleUrls: ['./sb-organization.component.scss']
})
export class SbOrganizationComponent implements OnDestroy {

  organizationDetail: OrganizationDetail[] = [];
  loading: boolean = true;
  private subscription: Subscription | any;

  constructor(private orgList: OrganizationListService, public dialogService: DialogService, public ref: DynamicDialogRef) { }

  ngOnInit() {
    this.getAllOrganizationList();
  }

  getAllOrganizationList() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
      }
    }
    this.subscription = this.orgList.getAllOrganizationList(body).subscribe(
      (data: any) => {
        this.organizationDetail = data.result.response.content;
        console.log(this.organizationDetail);
        this.sortByCreatedDate();
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  addOrg() {
    this.ref = this.dialogService.open(AddOrEditOrgComponent, {
      header: 'Add Organization',
      width: '40%',
      contentStyle: {
        overflow: 'auto'
      }
    });
    this.ref.onClose.subscribe((newOrganizationData: any) => {
      if (newOrganizationData) {
        this.organizationDetail.unshift(newOrganizationData);
      }
    });
  }

  sortByCreatedDate() {
    this.organizationDetail.sort((EndDate: any, StartDate: any) => {
      const dateEnd = new Date(EndDate.createdDate);
      const dateStart = new Date(StartDate.createdDate);
      return dateStart.getTime() - dateEnd.getTime();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


