import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization } from './organizations';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})

export class AddEditUserComponent {
  addEditUserForm!: FormGroup
  submitted: boolean = false;
  channel: string = "";
  Organization: Organization[] = [];
  emailPhoneRequired: boolean = false;
  organizations: any[] = [];
  roles: any[] = [];
  selectedRole: any[] = [];
  selectedOrganization!: any;
  messages!: Message[];
  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getOrganizations();
    this.initializeForm();
    this.submitted = false;

    this.roles = [
      { name: 'Content Creator', value: 'CONTENT_CREATOR' },
      { name: 'Content Reviewer', value: 'CONTENT_REVIEWER' },
      { name: 'Book Creator', value: 'BOOK_CREATOR' },
      { name: 'Book Reviewer', value: 'BOOK_REVIEWER' },
      { name: 'Org Admin', value: 'ORG_ADMIN' },
      { name: 'public', value: 'PUBLIC' }
    ]
  }
  cancel() {
    this.ref.close();
  }

  initializeForm() {
    this.addEditUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', Validators.pattern("[0-9]{10}")],
      phoneVerified: true,
      email: ['', Validators.email],
      emailVerified: true,
      password: ['', Validators.required],
      channel: ['', Validators.required],
      roles: ['', Validators.required],
    })
  }

  getOrganizations() {
    const payload = {
      "request": {
        "filters": {
          "isRootOrg": true
        },
        "fields": [
          "id",
          "channel",
          "orgName",
          "externalId",
          "isRootOrg"
        ],
        "sortBy": {
          "createdDate": "Desc"
        },
        "limit": 1000
      }
    }
    this.userService.getOrganizations(payload).subscribe((Response) => {
      this.organizations = Response.result.response.content;
      console.log(Response);
    });
  }

  saveUser() {
    this.submitted = true;
    if (!this.addEditUserForm.controls['phone'].value && !this.addEditUserForm.controls['email'].value) {
      this.emailPhoneRequired = true;
    } else {
      this.emailPhoneRequired = false;
    }
    if (this.addEditUserForm.invalid) {
      return
    }
    const payload = {
      "params": {},
      "request": this.addEditUserForm.value
    }
    this.messages = [];
    this.userService.addNewUser(payload).subscribe(response => {
      this.messages = [
        { severity: 'success', summary: 'Success', detail: response.params.status }
      ];
      this.ref.close(true);
      console.log(response);
    }, (error) => {
      this.messages = [
      ];
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.params.errmsg })
    })
  }
}
