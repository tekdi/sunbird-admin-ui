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

    OrganizationsUsersList : OrganizationsUsersList[]= [];

    orgUserListResponse: any[] = [];

    userListArray:any[] =[];

    userLists = [];

    outputjson :any[]=[];

    totalRecords:number=0;

    usersListdata =[
        {
            "firstName": "Tushar",
            "lastName": "Mahajan",
            "rootOrgName": "techjoomla",
            "phone": "",
            "roles": [],
            "userName": "tushar.mahajan",
            "userId": "6395a165-20f9-43be-97bc-71b7d17591ea",
            "email": "tu************@tekditechnologies.com"
        },
        {
            "firstName": "qadhruvaorg2",
            "lastName": "",
            "rootOrgName": "Andhra Pradesh",
            "phone": "",
            "roles": [],
            "userName": "qadhruvaorg2@yopmail.com",
            "userId": "c782e8b8-498a-4a71-9d3e-25520b7ae592",
            "email": "qa**********@yopmail.com"
        },
        {
            "firstName": "Prachi",
            "lastName": "tekdi",
            "rootOrgName": "Tekdi Shruti Sandbox",
            "phone": "",
            "roles": [],
            "userName": "prachi.tekdi",
            "userId": "de8a4d4f-e42c-47eb-a99a-bab30dfec6b1",
            "email": "pr**********@yopmail.com"
        },
        {
            "firstName": "Shruti",
            "lastName": "Dhole",
            "rootOrgName": "Tekdi Shruti Sandbox",
            "phone": "",
            "roles": [],
            "userName": "shruti",
            "userId": "c945fb66-bea0-42c8-a487-6f1e170a3b6a",
            "email": "sd********@gmail.com"
        },
        {
            "firstName": "tekdiMenuBarTest1",
            "lastName": "Public",
            "rootOrgName": "tekdiMenuBarTest1",
            "phone": "",
            "roles": [],
            "userName": "tekdimenubartest1_public",
            "userId": "b77f0e9e-c36f-482f-8d42-c112f5985521",
            "email": "te**********************@yopmail.com"
        },
        {
            "firstName": "Content Reviewer",
            "lastName": "user",
            "rootOrgName": "SB Language Learning",
            "phone": "",
            "roles": [],
            "userName": "contentreviewer_sblanguagelearning",
            "userId": "a692952d-565f-4517-a5ad-bb60cf72caf7",
            "email": "co********************************@yopmail.com"
        },
        {
            "firstName": "Public",
            "lastName": "user",
            "rootOrgName": "SB Language Learning",
            "phone": "",
            "roles": [],
            "userName": "public_sblanguagelearning",
            "userId": "62900514-2102-49d6-8ea2-b8ba090e31ec",
            "email": "pu***********************@yopmail.com"
        },
        {
            "firstName": "Content Creator",
            "lastName": "user",
            "rootOrgName": "SB Language Learning",
            "phone": "",
            "roles": [],
            "userName": "contentcreator_sblanguagelearning",
            "userId": "f5685b19-ad04-442b-bc05-425997504379",
            "email": "co*******************************@yopmail.com"
        },
        {
            "firstName": "indcreator2",
            "lastName": null,
            "rootOrgName": "INDedPreview2",
            "phone": "",
            "roles": [],
            "userName": "indcreator2",
            "userId": "fec96b96-a53f-4341-9393-a9983fdb0c7e",
            "email": "in*********@yopmail.com"
        },
        {
            "firstName": "tekdiMenuBarTest2",
            "lastName": "Public",
            "rootOrgName": "tekdiMenuBarTest2",
            "phone": "",
            "roles": [],
            "userName": "tekdimenubartest2_public",
            "userId": "a4899b69-2a7c-4286-91fc-104490bc66de",
            "email": "te**********************@yopmail.com"
        },
        {
            "firstName": "Public",
            "lastName": "Tamilnadu-FLN",
            "rootOrgName": "Tamilnadu-FLN",
            "phone": "",
            "roles": [],
            "userName": "public_tnfln",
            "userId": "41004597-ad1f-4082-a207-160245480269",
            "email": "pu**********@yopmail.com"
        },
        {
            "firstName": "Reviewer",
            "lastName": "Tamilnadu-FLN",
            "rootOrgName": "Tamilnadu-FLN",
            "phone": "",
            "roles": [],
            "userName": "contentreviewer_tnfln",
            "userId": "1e4dbe4c-3d49-408e-bcf9-e9c21e3ba1c7",
            "email": "co*******************@yopmail.com"
        },
        {
            "firstName": "Creator",
            "lastName": "Tamilnadu-FLN",
            "rootOrgName": "Tamilnadu-FLN",
            "phone": "",
            "roles": [],
            "userName": "contentcreator_tnfln",
            "userId": "d625025b-0171-4059-a956-321bb89f2379",
            "email": "co******************@yopmail.com"
        }
    ]

    constructor(private userService: UserService, private messageService: MessageService) { }

    ngOnInit() {
        
        this.getOrganizations().subscribe((data: any) => {
            if (data && data.length > 0) {
              this.orgUserListResponse = data;
              this.getOrganizationUserList(data);         
            }
          });
        console.log('final',this.OrganizationsUsersList);


        this.userService.getUsers().then(data => {
            this.users = data
            console.log(data);
        });
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
            console.log(this.organizations);
            return this.organizations;
          })
        );
      }

    getOrganizationUserList(usersList: any): void {
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
            updated = Users?.result?.response?.content;
            console.log('updated',updated);
           if (updated && updated.length > 0 && updated.length<5) {
           this.OrganizationsUsersList.push(...updated);
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
