import { Component, OnDestroy } from '@angular/core';
import { OrganizationDetail } from './OrganizationDetail';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sb-organization',
  templateUrl: './sb-organization.component.html',
  styleUrls: ['./sb-organization.component.scss']
})
export class SbOrganizationComponent implements OnDestroy {

  organizationDetail: OrganizationDetail[] = [];

  loading: boolean = true;

  organizationDetailResponse: any[] = [];

  private subscription: Subscription | any;

  constructor(private orgList: OrganizationListService) { }

  ngOnInit() {
    this.getOrganization();
  }

  //Get all tenant data
  getOrganization() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        },
        "fields": [
          "id",
          "channel",
          "orgName",
          "externalId",
          "isRootOrg"
        ],
        "sortBy": {
          "createdDate": "Desc"
        },
        "limit": 1002
      }

    }
    this.subscription = this.orgList.getOrganizationList(body).subscribe((data: any) => {
      this.organizationDetail = data.result.response.content;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


