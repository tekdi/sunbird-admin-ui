import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { CategoryName, CategoryCode } from 'src/config/constant.config';
import { InviteonlyService } from 'src/app/sb-admin/service/inviteonly.service';
import { OrganizationsUsersList } from 'src/app/sb-admin/interfaces/organizationsUsersList';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-enroluser',
  templateUrl: './enroluser.component.html',
  styleUrls: ['./enroluser.component.scss']
})
export class EnroluserComponent implements OnInit {
  @ViewChild('myTable') myTable1!: Table;
  private subscription!: Subscription;
  batchUpdate!: FormGroup;
  enrolUserform!: FormGroup;
  submitted = false;
  messages: Message[] = [];
  organizations: any[] = [];
  selectedOrg: any[] = [];
  first = 0;
  orgId: any;
  frameworks: any[] = [];
  BTopen: boolean = false;
  BTinvite: boolean = false;
  createdBy: any;
  createdFor: any;
  batchDetails: any;
  cols: any[] = [];
  rowsPerPageOptions: number[] = [10, 20, 30];
  rows: number = 10;
  count: number = 0;
  enrolUserdialog: boolean=false;
  organizationsUsersList: OrganizationsUsersList[] = [];
  loading: boolean = false;
  timeout: any = null;
  filteredValue = SearchFilterValue;
  publicUsersList: any;
  selectedRows: any[] = [];
  editBatchDetails: any;
  constructor(
    private userService: UserService,
    private inviteonlyService: InviteonlyService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe,
  ) {}

  ngOnInit() {
    this.initializeAddForm();
  }

  initializeAddForm() {
    this.batchUpdate = this.formBuilder.group({
      courseId: ['', Validators.required],
    });

    this.enrolUserform = this.formBuilder.group({
      userId:['',Validators.required]
    })
  }

  getBatch() {
    this.submitted = true;
    const updatedFormValues = { ...this.batchUpdate.value };
    const body = {
      "request": {
        "filters": {
          "courseId": updatedFormValues.courseId
        }
      }
    };
    this.subscription= this.inviteonlyService.getbatchlist(body).subscribe(
      (response:any) => {
        if (response) {
          this.batchDetails = response?.result?.response?.content;
          console.log("this.batchDetails",this.batchDetails)

        }
       },
      (error) => {this.handleFrameworkSaveError(error)}
    );
  }

  enrolUser(data: any): void {
    this.enrolUserdialog=true
    this.editBatchDetails =data;
    this.loadUserList(data)
  }

  hideDialog() {
    this.enrolUserdialog=false
    this.submitted = false;
  }
  onRowSelect(event: any) {
    this.selectedRows.push(event.data);
  }
  
  onRowUnselect(event: any) {
    this.selectedRows = this.selectedRows.filter(row => row !== event.data);
  }
  
  // Modify saveEnroluser method to use selectedRows array
  saveEnroluser() {
    if (this.selectedRows.length > 0) {
      console.log('Selected users:', this.selectedRows);
      console.log("this .batch",this.editBatchDetails)
      const extractedIds = this.selectedRows.map(user => user.id);
      console.log('Extracted IDs:', extractedIds);

      extractedIds.forEach(userId => {
        const body = {
            "request": {
                "courseId": this.editBatchDetails.courseId,
                "batchId": this.editBatchDetails.batchId,
                "userId": userId
            }
        };
        console.log("body",body)
        this.subscription = this.inviteonlyService.saveEnroluser(body).subscribe(
            users => {
                this.handleFrameworkSaveSuccess(users);
            },
            (error: any) => {
                this.handleFrameworkSaveError(error);
            }
        );
    });


    } else {
      console.log('No users selected.');
    }
  }

  onSearch(event: any, column: string): void {
    let $this = this;
    this.first = 0
    this.loadUserList(event);
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
      this.publicUsersList = this.organizationsUsersList.filter(user => {
        return user.organisations.some((org:any) => org.roles.includes("PUBLIC"));
    });
      this.count = users?.result?.response?.count;
      this.loading = false;
    }, (error: any) => {
      this.handleFrameworkSaveError(error)
    })
  }

  handleFrameworkSaveSuccess(response: any): void {
    this.messages = [];
    this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('FRAMEWORK_ADDED') });
    this.batchUpdate.reset();
   
    this.submitted = false;
  }

  handleFrameworkSaveError(error: any): void {
    this.submitted = false;
    this.messages = [];
    this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
  }


  ngOnDestroy() {
    if (this.subscription) {
     this.subscription.unsubscribe();
     }
   }
}
