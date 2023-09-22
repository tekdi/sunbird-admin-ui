import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription, Observable } from 'rxjs';
import { UserCountService } from '../../service/user-count.service';
import $ from 'jquery';
import { SearchFilterValue, OrganizationDetail, UserRoles } from '../../interfaces/OrganizationDetail';
import { MessageService, Message } from 'primeng/api';
import { OrganizationListService } from '../../service/organization-list.service';
import { UserService } from '../../service/user.service';
import { I18NextPipe } from 'angular-i18next';
import { SystemRoles, Content } from 'src/config/constant.config'
import { DialogService } from 'primeng/dynamicdialog';
import { SubOrgDetailsComponent } from './sub-org-details/sub-org-details.component';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  organizationDetail: OrganizationDetail[] = [];
  loading: boolean = true;
  rows: number = 10;
  first: number = 0;
  rowsPerPageOptions: number[] = [10, 20, 30];
  orgCount: number = 0;
  filteredValue = SearchFilterValue;
  timeout: any = null;
  subscription!: Subscription;
  messages: Message[] = [];
  totalUserCount: number = 0;
  totalSubOrgCount: number = 0;
  visible: boolean = false;
  orgRoles: any;
  contentTypeandCount: any;
  content = Content;
  systemRoles = SystemRoles;
  userRoles!: UserRoles[];

  constructor(private userCountService: UserCountService,
    private messageService: MessageService,
    private orgList: OrganizationListService,
    private userService: UserService,
    private i18nextPipe: I18NextPipe,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {
    $(document).ready(function () {
      $("#eng").click(function () {
        localStorage.setItem('lang', 'en');
        document.location.reload();
      });
    });
    this.getTotalOrgCount();
    this.getTotalUserCount();
    this.getTotalSubOrgCount();
  }

  loadOrganizationData(event: any) {
    this.loading = true;
    this.subscription = this.getAllOrg(event).subscribe((data: any) => {
      this.organizationDetail = data;
      if (data && data.length > 0) {
        this.getSubOrgCountOfEachOrg(data);
        this.getUserCountOfEachOrg(data);
      } else {
        this.loading = false;
      }
    },
      (error: any) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: this.i18nextPipe.transform('API_ERROR') })
      }
    );
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
    return this.orgList.getAllOrgSubOrg(body).pipe(
      map((data: any) => {
        this.organizationDetail = data.result.response.content;
        return this.organizationDetail;
      },
        (error: any) => {
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
        $this.loadOrganizationData(event);
      }, 2000);
    }
    else if (event.target.value.length === 0) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.loadOrganizationData(event);
      }, 1000);
    }
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
      this.subscription = this.orgList.getAllOrgSubOrg(body).subscribe((subOrgCount: any) => {
        org.subOrgCount = subOrgCount.result.response.count;
      })
    },
      (error: any) => {
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
      this.subscription = this.userCountService.getUserCountOfaTenant(body).subscribe(
        (counttenant: any) => {
          org.userCount = counttenant?.result?.response?.count;
          if (orgDetail[orgDetail.length - 1].id === org.id) {
            this.loading = false;
          }
        },
        (error: any) => {
          this.loading = false
        }
      );
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
        this.messageService.add({ severity: 'error', summary: error?.error?.params?.errmsg })
      }
    );
  }

  getTotalSubOrgCount() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": false
        }
      }
    }
    this.subscription = this.orgList.getAllOrgSubOrg(body).subscribe((response: any) => {
      this.totalSubOrgCount = response.result.response.count;
    },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: error?.error?.params?.errmsg })
      }
    )
  }

  getTotalUserCount() {
    const body = {
      "request": {
        "filters": {
        }
      }
    }
    this.subscription = this.userService.loadUserList(body).subscribe((response: any) => {
      this.totalUserCount = response.result.response.count;
    },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: error?.error?.params?.errmsg })
      }
    )
  }

  getAllUserTypeandCount(organization: any) {
    this.visible = true;
    this.orgRoles = organization;
    this.loading = true
    this.subscription = this.getAllUserType(organization).subscribe(
      (data: any) => {
        if (data) {
          this.getAllUserTypeCount(data, organization.id);
          this.loading = false;
        }
      },
      (error: any) => {
        this.loading = false
      }
    );
  }

  getAllUserType(organization: any): Observable<any> {
    const id = organization.id;
    const body = {
      "request": {
        "type": "config",
        "action": "get",
        "subType": "userType",
        "id": id,
        "component": "portal"
      }
    };
    return this.userService.getAllUserRoles(body).pipe(
      map((response: any) => {
        this.userRoles = response.result.form.data?.fields;
        return this.userRoles;
      })
    );
  }

  getAllUserTypeCount(userTypes: any, id: any) {
    let errorOccured = false;
    userTypes.map((org: any) => {
      const body = {
        "request": {
          "filters": {
            "rootOrgId": id,
            "userType": org.name
          }
        }
      }
      this.subscription = this.orgList.getUserandSystemTypeCount(body).subscribe((data: any) => {
        org.userTypeCount = data.result.response.count;
        this.loading = false
      },
        (error: any) => {
          if (!errorOccured) {
            errorOccured = true;
            this.messageService.add({ severity: 'error', summary: error?.error?.params?.errmsg })
          }
        }
      )
    })
  }

  getSystemRolesWithCounts(org: any) {
    this.systemRoles.forEach(role => {
      const body = {
        "request": {
          "filters": {
            "channel": org.channel,
            "organisations.roles": [role.name]
          }
        }
      };
      this.subscription = this.orgList.getUserandSystemTypeCount(body).subscribe((data: any) => {
        role.count = data.result.response.count;
      },
        (error: any) => {
          this.loading = false;
        }
      );
    });
  }

  getContentTypeCount(org: any) {
    const body = {
      "request": {
        "filters": {
          "status": [
            "Live"
          ],
          "channel": org.id
        },
        "facets": [
          "contentType"
        ]
      }
    }
    this.orgList.getContentTypeCount(body).subscribe((data: any) => {
      this.contentTypeandCount = data.result.facets[0].values;
      this.content.forEach(contentItem => {
        const matchContent = this.contentTypeandCount.find((values: any) => values.name === contentItem.name)
        if (matchContent) {
          contentItem.count = matchContent.count;
        }
        else {
          contentItem.count = 0;
        }
      })

    },
      (error: any) => {
        this.loading = false;
      }
    )
  }

  getSubOrgDetail(rootOrg: any) {
    this.dialogService.open(SubOrgDetailsComponent, {
      data: { rootOrg },
      width: '60%',
      header: this.i18nextPipe.transform('SUB_ORGANIZATION')
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
