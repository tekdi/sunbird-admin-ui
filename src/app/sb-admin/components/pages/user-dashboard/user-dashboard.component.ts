import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { I18NextPipe } from 'angular-i18next';
import { Subscription } from 'rxjs';
import { OrganizationsUsersList } from '../../../interfaces/organizationsUsersList';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  private subscription!: Subscription;
  cols: any[] = [];
  loading: boolean = true;
  organizations: any[] = [];
  organizationsUsersList: OrganizationsUsersList[] = [];
  rowsPerPageOptions: number[] = [10, 20, 30];
  rows: number = 10;
  messages!: Message[];
  count: number = 0;
  first: number = 0
  filteredValue = SearchFilterValue;
  timeout: any = null;
  status = [
    { name: 'Active', 'value': '1' },
    { name: 'Inactive', 'value': '0' }
  ]

  constructor(private userService: UserService,
    private i18nextPipe: I18NextPipe,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getOrganizations();
  }

  getOrganizations() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
      }
    }
    this.subscription = this.userService.getOrganizations(body).subscribe((response: any) => {
      this.organizations = response?.result?.response?.content;
    }, (error) => {
      this.messages = [];
      this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg })
    });
  }

  loadUserList(event: any) {
    let filters = this.filteredValue;
    Object.keys(filters).forEach(key => {
      if (!filters[key]) {
        delete filters[key]
      }
    });
    let offset = event.first;
    offset = isNaN(offset) ? 0 : offset;

    const body = {
      request: {
        filters: filters,
        limit: event?.rows,
        offset: offset
      }
    }
    this.subscription = this.userService.loadUserList(body).subscribe(users => {
      this.organizationsUsersList = users?.result?.response?.content;
      this.count = users?.result?.response?.count;
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.messages = [];
      this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
    })
  }

  onSearch(event: any, column: string): void {
    let $this = this;
    this.first = 0
    if (column === 'organizations' || column === 'status') {
      this.loadUserList(event);
    } else if (event.target.value.length > 3) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.loadUserList(event);
      }, 2000);
    } else if (event.target.value.length === 0) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.loadUserList(event);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}