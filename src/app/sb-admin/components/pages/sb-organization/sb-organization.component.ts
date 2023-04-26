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

  private subscription: Subscription | any;

  constructor(private orgList: OrganizationListService) { }

  ngOnInit() {
    this.getAllOrganizationList();
  }

  //Get all Organization  data
  getAllOrganizationList() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
      }

    }
    this.subscription = this.orgList.getAllOrganizationList(body).subscribe((data: any) => {
      this.organizationDetail = data.result.response.content;
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


