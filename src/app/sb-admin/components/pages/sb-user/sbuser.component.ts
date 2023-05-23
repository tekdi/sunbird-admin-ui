import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { map } from 'rxjs';
import { OrganizationsUsersList } from './organizationsUsersList';
import { User } from 'src/app/sb-admin/api/user';

@Component({
  templateUrl: './sbuser.component.html',
  providers: [MessageService]
})
export class SbUserComponent implements OnInit {

  userDialog: boolean = false;
  deleteUserDialog: boolean = false;
  deleteUsersDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  loading: boolean = true;
  organizations: any[] = [];
  OrganizationsUsersList: OrganizationsUsersList[] = [];
  globalFilterFields: string[] = ['rootOrgName', 'firstName', 'lastName', 'email', 'phone'];
  rowsPerPageOptions: number[] = [10, 20, 30];
  rows: number = 10;
  user!: User;
  selectedUserRole:string[]=[];

  roles = [
    { name: 'Content Creator', value: 'CONTENT_CREATOR' },
    { name: 'Content Reviewer', value: 'CONTENT_REVIEWER' },
    { name: 'Book Creator', value: 'BOOK_CREATOR' },
    { name: 'Book Reviewer', value: 'BOOK_REVIEWER' },
    { name: 'Org Admin', value: 'ORG_ADMIN' },
    { name: 'Public', value: 'PUBLIC' }
]
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getOrganizations().subscribe((data: any) => {
      if (data && data.length > 0) {
        this.getOrganizationList(data);
      }
    });
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

  getOrganizationList(usersList: any): void {
    let updated = [];
    usersList.forEach((UserList: any) => {
      const body = {
        "request": {
          "filters": {
            "rootOrgId": UserList.id
          }
        }
      };
      this.userService.getOrganizationUserList(body).subscribe((Users: any) => {
        updated = Users?.result?.response?.content;
        if (updated && updated.length > 0) {
          this.OrganizationsUsersList.push(...updated);
          this.loading = false;
        }
      }, (error: any) => {
        console.error(error);
        this.loading = false;
      }
      );
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editRole(user: any) {
    this.userDialog = true;
    this.user = user;
    this.selectedUserRole = this.user.organisations[0].roles
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
      this.userService.saveUserRole(body).subscribe(() => {
        this.user.organisations[0].roles = this.selectedUserRole;
        this.hideDialog();
      })
    }
  }
  hideDialog(){
    this.userDialog=false;
    this.submitted=false;
  }
}

