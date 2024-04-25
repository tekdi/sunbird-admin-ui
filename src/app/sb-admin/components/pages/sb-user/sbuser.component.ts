import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DialogService } from 'primeng/dynamicdialog';
import { I18NextPipe } from 'angular-i18next';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { OrganizationsUsersList } from 'src/app/sb-admin/interfaces/organizationsUsersList';
import { SearchFilterValue, User } from 'src/app/sb-admin/interfaces/user';
import { Roles } from 'src/config/constant.config';
import { HttpClient } from '@angular/common/http';
// import { read, utils, writeFile } from 'xlsx';

@Component({
  templateUrl: './sbuser.component.html',
  providers: [MessageService]
})
export class SbUserComponent implements OnInit {

  private subscription!: Subscription;
  createUser: any = { header: this.i18nextPipe.transform('USER_CREATE'), width: '40%', height: 'auto' };
  userDialog: boolean = false;
  blockUnblockUserDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  loading: boolean = true;
  organizations: any[] = [];
  organizationsUsersList: OrganizationsUsersList[] = [];
  rowsPerPageOptions: number[] = [10, 20, 30];
  rows: number = 10;
  count: number = 0;
  user!: User;
  selectedUserRole: string[] = [];
  roles = Roles;
  messages!: Message[];
 
  users: User[] = [];
  first: number = 0
  filteredValue = SearchFilterValue;
  timeout: any = null;
  status = [
    { name: 'Active', 'value': '1' },
    { name: 'Inactive', 'value': '0' }
  ]
  selectedFile!: File ;
  movies: any;
  selectedRows: any[] = [];
  extractedIds!: any[];

  constructor(private userService: UserService,
    public dialogService: DialogService,
    private i18nextPipe: I18NextPipe,
    private messageService: MessageService,
    private http: HttpClient

  ) { }

  ngOnInit() {
   
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
      }, (error) => {
        this.messages = [];
        this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg })
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
        this.organizationsUsersList.unshift(result);
        this.count = this.organizationsUsersList.length;
        this.messages = [
        ];
        this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('USER_ADDED_SUCCESSFULLY') }
        )
      }
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
        filters: {
          "rootOrgId": sessionStorage.getItem("rootOrgId")
      },
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

  blockUnblockUser(user: User) {
    this.blockUnblockUserDialog = true;
    this.user = user;
    console.log("this.user",this.user)
  }

  blockUnblockUser1(){
    this.blockUnblockUserDialog = true;
    this.extractedIds = this.selectedRows.map(user => ({
      id: user.id,
      status: user.status
    }));
    console.log("this.extractedIds",this.extractedIds)

  }

  confirmBlock() {
    console.log("")
    if(this.extractedIds.length == 0){
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
    else{
      this.extractedIds.forEach(userId => {
        const body = {
              "request": {
                "userId": userId.id
              }
        };
        console.log("body",body,userId)
        this.userService.blockUnblockUser(body, userId?.status).subscribe(response => {
          this.messages = [];
          if (userId.status) {
            userId.status = 0;
            this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('USER_BLOCK_SUUCCESSFULLY') });
          } else {
            userId.status = 1;
            this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('USER_UNBLOCK_SUUCCESSFULLY') });
          }
          this.blockUnblockUserDialog = false;
        }, (error: any) => {
          this.messages = [];
          this.messageService.add({ severity: 'error', detail: error.error.params.errmsg });
        })
    });
    }
   
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

  onRowSelect(event: any) {
    this.selectedRows.push(event.data);
    console.log("this.selected row",this.selectedRows)
  }
  
  onRowUnselect(event: any) {
    this.selectedRows = this.selectedRows.filter((row:any) => row !== event.data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onFileSelected(event:any): void  {
    this.selectedFile = <File>event.target.files[0];
  }

  // onUpload() {
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile, this.selectedFile.name);
  //   console.log("formdata",formData)
  //   this.userService.uploadblukUser(formData).subscribe(
  //     (res:any) => {
  //       console.log(res);
  //       // Do something with the response
  //     },
  //     (err:any) => {
  //       console.error(err);
  //       // Handle error
  //     }
  //   );
  // }

//   handleImport($event: any) {
//     const files = $event.target.files;
//     if (files.length) {
//         const file = files[0];
//         const reader = new FileReader();
//         reader.onload = (event: any) => {
//             const wb = read(event.target.result);
//             const sheets = wb.SheetNames;

//             if (sheets.length) {
//                 const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
//                 this.movies = rows;
//             }
//         }
//         reader.readAsArrayBuffer(file);
//     }
//     console.log("thhissss",this.movies)
// }

}