import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs';
import { UserCountService } from '../../service/user-count.service';
import { TenantDetails } from './tenantDetails';
import $ from 'jquery';
import { SearchFilterValue } from '../pages/sb-organization/OrganizationDetail';
import { Subscription } from 'rxjs';
import { MessageService, Message } from 'primeng/api';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  tenantDetail: TenantDetails[] = [];
  loading: boolean = true;
  tenantUserCountResponse: any[] = [];
  rows: number = 10;
  first: number = 0;
  rowsPerPageOptions: number[] = [10, 20, 30];
  orgCount: number = 0;
  filteredValue = SearchFilterValue;
  timeout: any = null;
  subscription!: Subscription;
  messages: Message[] = [];

  constructor(private userCountService: UserCountService, private messageService: MessageService) { }

  ngOnInit() {
    $(document).ready(function () {
      $("#eng").click(function () {
        localStorage.setItem('lang', 'en');
        document.location.reload();
      });
    });
  }

  loadOrg(event: any) {
    this.subscription = this.getTenant(event).subscribe((data: any) => {
      if (data && data.length > 0) {
        this.tenantUserCountResponse = data;
        this.getTenantUsercount(data);
      }
    },
      (error: any) => {
        console.log(error);
        this.loading = false
      }
    );
  }

  getTenant(event: any) {
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

    return this.userCountService.getTenant(body).pipe(
      map((data: any) => {
        this.tenantDetail = data.result.response.content;
        this.orgCount = data.result.response.count;
        return this.tenantDetail;
      },
        (error: any) => {
          console.log(error);
          this.loading = false;
        }
      )
    );
  }

  onSearch(event: any): void {
    let $this = this;
    this.first = 0
    if (event.target.value.length > 3) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.loadOrg(event);
      }, 2000);
    }
    else if (event.target.value.length === 0) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.loadOrg(event);
      }, 1000);
    }
  }

  //Get user count of each tenant 
  getTenantUsercount(tenantDetail: any): void {
    let errorOccured = false;
    tenantDetail.map((tenant: any) => {
      const body = {
        "request": {
          "filters": {
            "rootOrgId": tenant.id
          }
        }
      };
      this.subscription = this.userCountService.getUserCountOfaTenant(body).subscribe((counttenant: any) => {
        tenant.userCount = counttenant?.result?.response?.count;
        if (tenantDetail[tenantDetail.length - 1].id === tenant.id) {
          this.loading = false;
        }
      },
        (error: any) => {
          if (!errorOccured) {
            errorOccured = true;
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: error?.error?.params?.errmsg })
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
