import { Component, OnInit } from '@angular/core';
import { InviteonlyService } from 'src/app/sb-admin/service/inviteonly.service';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'app-batchupdate',
  templateUrl: './batchupdate.component.html',
  styleUrls: ['./batchupdate.component.scss']
})
export class BatchupdateComponent implements OnInit {
  private subscription!: Subscription;
  batchUpdate!: FormGroup;
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

  constructor(
 
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
      batchName:['',Validators.required],
      description:['',null],
      open:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',null],
      userId:['',Validators.required],
      enrollmentEndDate:['',null]

    });
  }

  getBatchtype(value: string): void {
    if (value === 'open') {
      this.BTopen = true;
      this.BTinvite = false;
    } else {
      this.BTopen = false;
      this.BTinvite = true;
    }
  }
  createBatch() {
    this.submitted = true;
    const updatedFormValues = { ...this.batchUpdate.value };
    const body = {
      "request": {
        "filters": {
          "identifier": updatedFormValues.courseId
        }
      }
    };

    this.subscription= this.inviteonlyService.getContent(body).subscribe(
      (response:any) => {
        if (response && response?.result && response.result.content && response.result.content.length > 0) {
          const content = response.result.content[0];
          this.createdBy = content.createdBy;
          this.createdFor = content.createdFor;
          const data = {
            "request": {
              "courseId": updatedFormValues.courseId,
              "name": updatedFormValues.batchName,
              "description": updatedFormValues.description,
              "enrollmentType": updatedFormValues.open,
              "startDate": updatedFormValues.startDate,
              "endDate": updatedFormValues.endDate,
              "createdBy": this.createdBy,
              "enrollmentEndDate":updatedFormValues.enrollmentEndDate,
              "createdFor": this.createdFor,
              "tandc": true
          }
          }
          console.log(this.createdBy,this.createdFor[0])
          console.log("body",data)
          this.subscription = this.inviteonlyService.createBatch(data).subscribe(
            (response:any)=>{
              console.log("responce",response.result.batchId)
            },
            (error:any)=>this.handleFrameworkSaveError(error)
          )

        }
       },
      (error) => {this.handleFrameworkSaveError(error)}
    );
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
