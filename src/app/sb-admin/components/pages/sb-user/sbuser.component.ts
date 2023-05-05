import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/sb-admin/api/user';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/sb-admin/service/user.service';
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
  users: User[] = [];
  user: User = {};
  selectedUsers: User[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  organizations: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  OrganizationsUsersList: OrganizationsUsersList[] = [];
  allOrganizations: any[] = [];
  userListArray: any[] = [];
  userLists = [];
  outputjson: any[] = [];
  totalRecords: any;
  isChecked: string[] = [];

  constructor(private userService: UserService, private messageService: MessageService) { }
  ngOnInit() {
    this.getOrganizations().subscribe((data: any) => {
      if (data && data.length > 0) {
        // this.allOrganizations = data;
        this.getOrganizationList(data);
        //console.log(data);
      }
    });
    console.log('final', this.OrganizationsUsersList);

    this.cols = [
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      //{ field: 'role', header: 'Role' },
      { field: "email", header: "Email" },
      { field: "phone", header: "Phone" },
      { field: "status", header: "Status" },
      { field: "channel", header: "Channel" },
    ];

  this.statuses = [
      { label: 'ACTIVE', value: 'active' },
      { label: 'INACTIVE', value: 'inactive' }
  ];

  }
  //Get all tenant data
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
        // console.log(this.organizations);
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
            "phone"
          ],
        }
      };
      this.userService.getOrganizationUserList(body).subscribe((Users: any) => {
        // this.organizationList = Users.organizationList;
        updated = Users?.result?.response?.content;
        console.log('updated', updated);
        if (updated && updated.length > 0) {
          this.OrganizationsUsersList.push(...updated);
          console.log(this.OrganizationsUsersList);
        }
        //    setTimeout(() => {
        //   }, 5000);
      });
    });
  }
  
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }
  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }
  deleteUser(user: User) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }
  confirmDeleteSelected() {
    this.deleteUsersDialog = false;
    this.users = this.users.filter(val => !this.selectedUsers.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    this.selectedUsers = [];
  }
  confirmDelete() {
    this.deleteUserDialog = false;
    this.users = this.users.filter(val => val.id !== this.user.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    this.user = {};
  }
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
  saveUser() {
    this.submitted = true;
    if (this.user.firstName?.trim()) {
      if (this.user.id) {
        // @ts-ignore
        this.user.inventoryStatus = this.user.inventoryStatus.value ? this.user.inventoryStatus.value : this.user.inventoryStatus;
        this.users[this.findIndexById(this.user.id)] = this.user;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
      } else {
        this.user.id = this.createId();
        // @ts-ignore
        this.user.inventoryStatus = this.user.inventoryStatus ? this.user.inventoryStatus.value : 'INSTOCK';
        this.users.push(this.user);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
      }
      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

