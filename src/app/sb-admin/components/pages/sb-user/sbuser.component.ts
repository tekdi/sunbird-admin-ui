import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/sb-admin/api/user';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DialogService } from 'primeng/dynamicdialog';
import { I18NextPipe } from 'angular-i18next';

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
    addEditUserForm: any;
    newUser: any;
    constructor(
        private userService: UserService,
        private messageService: MessageService,
        public dialogService: DialogService,
        private i18nextPipe: I18NextPipe
    ) { }

    ngOnInit() {
        this.getUserList();
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

    getUserList() {
        const body = {
            "request": {
                "filters": {
                    "rootOrgId": [],
                },
                "sortBy": {
                    "createdDate": "Desc"
                }
            }
        }
        this.userService.getUserList(body).subscribe((response) => { 
            this.users = response?.result?.response?.content
            this.users.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        });
    }

    addNewUser() {
        const ref = this.dialogService.open(AddEditUserComponent, { header: this.i18nextPipe.transform('CREATE_NEW_USER'), width: '30%', height: 'auto' });
        ref.onClose.subscribe((result) => {
            if (result) {
                this.users.unshift(result);
            }
        });
    }

    editUser(user: any) {
        const ref = this.dialogService.open(AddEditUserComponent, {
            data: user,
            header: this.i18nextPipe.transform('EDIT_USER'),
            width: '30%',
            height: 'auto'
        });
        
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
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
