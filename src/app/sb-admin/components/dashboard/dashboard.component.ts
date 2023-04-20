import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs';
import { UserCountService } from '../../service/user-count.service';
import { TenantDetails } from './tenantDetails';
import $ from 'jquery';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  tenantDetail: TenantDetails[] = [];

  loading: boolean = true;

  tenantUserCountResponse: any[] = [];

  constructor(private userCountService: UserCountService) 
  {}

  ngOnInit() {
    $(document).ready(function () {
      $("#eng").click(function () {
        localStorage.setItem('lang', 'en');
        document.location.reload();
      });
    });

    this.getTenant().subscribe((data: any) => {
      if (data && data.length > 0) {
        this.tenantUserCountResponse = data;
        this.getTenantUsercount(data);
      }
    });
  }

  //Get all tenant data
  getTenant() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
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
          }
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
