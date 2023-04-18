import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { map, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserCountService } from '../../service/user-count.service';
import { TenantDetails } from './tenantDetails';
import $ from 'jquery';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  tenantDetail: TenantDetails[] = [];

  cols: any[] = [];

  loading: boolean = true;

  tenantUserCount: any[] = [];

  constructor(private userService: UserService, public layoutService: LayoutService, private userCountService: UserCountService) 
  {}

  ngOnInit() {
    $(document).ready(function () {
      $("#eng").click(function () {
        localStorage.setItem('lang', 'en');
        document.location.reload();
      });
      $("#tam").click(function () {
        localStorage.setItem('lang', 'ta');
        document.location.reload();
      });
    });
    $(document).ready(function () {
      $("#flip").click(function () {
        $("#panel").slideToggle("fast");
      });
    });

    this.cols = [
      { field: 'orgName', header: 'Organization Name' },
      { field: 'userCount', header: 'User Registered' }
    ];

    this.getTenant().subscribe((data: any) => {
      if (data && data.length > 0) {
        this.tenantUserCount = data;
        this.getTenantUsercount(data);
      }
      else {
        this.tenantUserCount = [];
      }
    });
  }

  //Get all tenant data
  getTenant() {
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
    return this.userCountService.getTenant(body).pipe(
      map((data: any) => {
        this.tenantDetail = data.result.response.content;
        return this.tenantDetail;
      })
    );
  }

  //Get user count of each tenant 
  getTenantUsercount(tenantDetail: any): void {
    tenantDetail.map((tenant: any) => {
      const body = {
        "request": {
          "filters": {
            "rootOrgId": tenant.id
          },
          "fields": [
            "firstName",
            "lastName",
            "userName",
            "id",
            "email",
            "phone",
            "createdDate",
            "roles",
            "managedBy"
          ],
          "limit": 10
        }
      };
      this.userCountService.getUserCountOfaTenant(body).subscribe((counttenant: any) => {
        tenant.userCount = counttenant?.result?.response?.count;
        if (tenantDetail[tenantDetail.length - 1].id === tenant.id) {
          this.loading = false;
        }
      });
    });
  }
  
  ngOnDestroy(): void { }
}
