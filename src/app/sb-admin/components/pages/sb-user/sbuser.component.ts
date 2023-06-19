import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DialogService } from 'primeng/dynamicdialog';
import { I18NextPipe } from 'angular-i18next';
import { map } from 'rxjs';
import { OrganizationsUsersList } from './organizationsUsersList';
import { SearchFilterValue, User } from 'src/app/sb-admin/api/user';
import { Roles } from 'src/app/constant.config';
import { Status } from 'src/app/constant.config';

@Component({
  templateUrl: './sbuser.component.html',
  providers: [MessageService]
})
export class SbUserComponent implements OnInit {
  createUser: any = { header: this.i18nextPipe.transform('USER_CREATE'), width: '30%', height: 'auto' };
  userDialog: boolean = false;
  blockUnblockUserDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  loading: boolean = true;
  organizations: any[] = [];
  OrganizationsUsersList: OrganizationsUsersList[] = [];
  globalFilterFields: string[] = ['channel', 'firstName', 'lastName', 'email', 'phone',];
  rowsPerPageOptions: number[] = [10, 20, 30];
  rows: number = 10;
  user!: User;
  selectedUserRole: string[] = [];
  roles = Roles;
  messages!: Message[];
  totalRecords: number = 0;
  users: User[] = [];
  status = Status;
  first: number = 0
  filteredValue = SearchFilterValue;
  timeout: any = null;

  constructor(private userService: UserService,
    public dialogService: DialogService,
    private i18nextPipe: I18NextPipe,
    private messageService: MessageService,

  ) { }

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
    this.userService.getOrganizations(body).subscribe((response: any) => {
      this.organizations = response?.result?.response?.content;
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editRole(user: any) {
    this.userDialog = true;
    this.user = user;
    this.selectedUserRole = user?.organisations[0]?.roles
  }

  saveUserRole() {
    this.submitted = true;
    if (this.selectedUserRole.length > 0) {
      const body = {
        "request": {
          "userId": this.user.userId,
          "organisationId": this.user.rootOrgId,
          "roles": this.selectedUserRole
        }
      }
      this.userService.saveUserRole(body).subscribe((response) => {
        this.user.organisations[0].roles = this.selectedUserRole;
        this.messages = [
        ];
        this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('USER_ROLE_ADDED') })
        this.hideDialog();
        this.loadUserList({ first: 0 });
      }, (error) => {
        this.messages = [];
        this.messageService.add({ severity: 'error', detail: error.error.params.errmsg })
      })
    }
  }
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  addNewUser() {
    const ref = this.dialogService.open(AddEditUserComponent, this.createUser);
    ref.onClose.subscribe((result) => {
      if (result) {
        this.OrganizationsUsersList.unshift(result);
        this.totalRecords = this.OrganizationsUsersList.length;
        this.messages = [];
        this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('USER_ADDED_SUCCESSFULLY') }
        )
      }
    });
  }

  loadUserList(event: any) {
    let filters = this.filteredValue;
    filters.email ? filters.email : delete filters.email;
    filters.phone ? filters.phone : delete filters.phone;
    filters.firstName ? [filters.firstName] : delete filters.firstName;
    filters.lastName ? [filters.lastName] : delete filters.lastName;
    filters.rootOrgName ? [filters.rootOrgName] : delete filters.rootOrgName;
    filters.status ? [filters.status] : delete filters.status;

    var body = {
      request: {
        filters: filters,
        limit: event?.rows,
        offset: event?.first ? (event?.first / 10) + 1 : 0,
      }
    }

    this.userService.loadUserList(body).subscribe(users => {
      this.OrganizationsUsersList = users?.result?.response?.content;
      this.totalRecords = users?.result?.response?.count;
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.messages = [];
      this.messageService.add({ severity: 'error', detail: error.error.params.errmsg });
    })

  }

  blockUnblockUser(user: User) {
    this.blockUnblockUserDialog = true;
    this.user = user;
  }
  confirmBlock() {
    const payload = {
      "request": {
        "userId": this.user.userId
      }
    }
    this.userService.blockUnblockUser(payload, this.user?.status).subscribe(response => {
      this.messages = [];
      if (this.user.status) {
        this.user.status = 0;
        this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('USER_BLOCK_SUUCCESSFULLY') });
      } else {
        this.user.status = 1;
        this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('USER_UNBLOCK_SUUCCESSFULLY') });
      }
      this.blockUnblockUserDialog = false;
    }, (error: any) => {
      this.messages = [];
      this.messageService.add({ severity: 'error', detail: error.error.params.errmsg });
    })
  }

  onSearch(event: any): void {
    this.first = 0
    // if(event.target.value && event.target.value.length > 3){
    //   this.loadUserList(event);
    // } else {
    //   this.OrganizationsUsersList = []
    //   this.totalRecords = 0;
    // }
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      $this.loadUserList(event);
    }, 2000);

  }

  
}