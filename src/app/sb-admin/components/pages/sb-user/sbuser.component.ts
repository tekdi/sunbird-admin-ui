import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DialogService } from 'primeng/dynamicdialog';
import { I18NextPipe } from 'angular-i18next';
import { map } from 'rxjs';
import { OrganizationsUsersList } from './organizationsUsersList';

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
  globalFilterFields: string[] = ['channel', 'firstName', 'lastName', 'email', 'phone'];
  rowsPerPageOptions:number[]=[10,20,30];
  rows:number=10;
  

  constructor(private userService: UserService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private i18nextPipe: I18NextPipe

             ) { }

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
          },
          "fields": [
            "rootOrgName",
            "firstName",
            "lastName",
            "userName",
            "userId",
            "email",
            "phone",
            "channel",
            "status" 
          ],
          "sortBy": {
            "createdDate": "Desc"
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
  addNewUser() {
    const ref = this.dialogService.open(AddEditUserComponent, { header: this.i18nextPipe.transform('CREATE_NEW_USER'), width: '30%', height: 'auto' });
    ref.onClose.subscribe((result) => {
        if (result) {
            this.OrganizationsUsersList.unshift(result);
        }
    });
}

    editUser(user: any) {
        this.dialogService.open(AddEditUserComponent, {
            data: user,
            header: this.i18nextPipe.transform('EDIT_USER'),
            width: '30%',
            height: 'auto'
        });
    }
}

