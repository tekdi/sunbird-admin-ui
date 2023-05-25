import { Component, OnDestroy, ViewChild } from '@angular/core';
import { OrganizationDetail } from './OrganizationDetail';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrEditOrgComponent } from './add-or-edit-org/add-or-edit-org.component';
import { MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-sb-organization',
  templateUrl: './sb-organization.component.html',
  styleUrls: ['./sb-organization.component.scss']
})
export class SbOrganizationComponent implements OnDestroy {

  organizationDetail: OrganizationDetail[] = [];
  loading: boolean = true;
  private subscription: Subscription | any;
  globalFilterFields :string []=['organizationName','channel','id'];
  rows:number=10;
  messages: Message[] = [];

  constructor(private orgList: OrganizationListService, public dialogService: DialogService, public ref: DynamicDialogRef, private messageService: MessageService) { }

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
        this.organizationDetail.sort((startDate:any ,endDate :any)=>
          new Date(endDate.createdDate).getTime() - new Date(startDate.createdDate).getTime());
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
        this.displaySuccessMessage('Organization added successfully');
      }
    });
  }
  displaySuccessMessage(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


