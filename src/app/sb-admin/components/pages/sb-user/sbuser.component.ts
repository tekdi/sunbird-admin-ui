import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DialogService } from 'primeng/dynamicdialog';
import { I18NextPipe } from 'angular-i18next';
import { map } from 'rxjs';
import { OrganizationsUsersList } from './organizationsUsersList';
import { User } from 'src/app/sb-admin/api/user';
import { Roles } from 'src/app/constant.config';
import { event } from 'jquery';

@Component({
  templateUrl: './sbuser.component.html',
  providers: [MessageService]
})
export class SbUserComponent implements OnInit {
  createUser: any = { header: this.i18nextPipe.transform('USER_CREATE'), width: '30%', height: 'auto' };
  userDialog: boolean = false;
  deleteUserDialog: boolean = false;
  deleteUsersDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
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

  constructor(private userService: UserService,
    public dialogService: DialogService,
    private i18nextPipe: I18NextPipe,
    private messageService: MessageService,

  ) { }

  ngOnInit() {
    // this.getOrganizations().subscribe((data: any) => {
    //   if (data && data.length > 0) {
    //     this.getOrganizationList(data);
    //   }
    // });
  }

  getOrganizations() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
      }
    }
    return this.userService.getOrganizations(body).pipe(
      map((data: any) => {
        this.organizations = data?.result?.response?.content;
        return this.organizations;
      })
    );
  }

  // getOrganizationList(usersList: any): void {
  //   let updated = [];
  //   usersList.forEach((UserList: any) => {
  //     const body = {
  //       "request": {
  //         "filters": {
  //           "rootOrgId": UserList.id
  //         },
  //         "sortBy": {
  //           "createdDate": "Desc"
  //        }
  //       }
  //     };
  //     this.userService.getOrganizationUserList(body).subscribe((Users: any) => {
  //       updated = Users?.result?.response?.content;
  //       if (updated && updated.length > 0) {
  //         this.OrganizationsUsersList.push(...updated);
  //         this.loading = false;
  //       }
  //     }, (error: any) => {
  //       console.error(error);
  //       this.loading = false;
  //     }
  //     );
  //   });
  // }

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
        this.loadUserList({first: 0});
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
      }
    });
  }

  editUser(user: OrganizationsUsersList) {
    this.dialogService.open(AddEditUserComponent, {
      data: user,
      header: this.i18nextPipe.transform('USER_EDIT'),
      width: '30%',
      height: 'auto'
    });
  }
  loadUserList(event: LazyLoadEvent) {
    const body = {
      "request": {
        "filters": {
        },
        "limit": event?.rows,
        "offset": event?.first ? (event?.first / 10) + 1 : 0,
        "sortBy": {
          "createdDate": "Desc"
        }
      }
    };
    this.userService.loadUserList(body).subscribe(users => {
      this.OrganizationsUsersList = users?.result?.response?.content;

      this.totalRecords = users?.result?.response?.count
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
    })
  }
}

