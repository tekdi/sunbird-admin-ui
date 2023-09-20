import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Message, MessageService } from 'primeng/api';
import { Roles } from 'src/config/constant.config';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})

export class AddEditUserComponent {
  addEditUserForm!: FormGroup
  submitted: boolean = false;
  channel: string = "";
  emailPhoneRequired: boolean = false;
  organizations: any[] = [];
  selectedRole: any[] = [];
  messages!: Message[];
  roles = Roles;
  orgTypeSelection: any[] = [
    { name: 'Yes', value: 'yes' },
    { name: 'No', value: 'no' }
  ];
  selectedOrgTypeOption: string = 'yes';
  orgTypeRoot: boolean = false;
  orgTypeSubOrg: boolean = false;
  isSubOrgDisabled: boolean = true;
  suborgOptions: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private userService: UserService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private orgList: OrganizationListService
  ) { }

  ngOnInit(): void {
    this.getOrganizations();
    this.initializeForm();
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
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      organisationId: ['', Validators.required],
      roles: ['', Validators.required],
      status: ["ACTIVE"],
      selectedOrgTypeOption: ['', Validators.required],
      channelId: ['']
    })
    if (this.config.data) {
      let user = this.config.data;
      user = { ...user, roles: user?.organisations[0]?.roles }
      this.addEditUserForm.patchValue(user);
    }
  }

  getOrganizations() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        },
        "fields": [
          "id",
          "channel",
          "orgName",
          "externalId",
        ],
        "sortBy": {
          "createdDate": "Desc"
        }
      }
    }
    this.userService.getOrganizations(body).subscribe(
      (data: any) => {
        this.organizations = data?.result?.response?.content;
      });
  }

  loadSuborgOptions(selectedChannel: string) {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": false,
          "isTenant": false,
          "channel": selectedChannel

        }
      }
    }

    this.orgList.getAllOrgSubOrg(body).subscribe((data: any) => {
      this.suborgOptions = data?.result?.response?.content;
      this.isSubOrgDisabled = false;
    }, error => {
      console.error('Error:', error);
    });
  }

  getOrgType(value: string): void {
    this.selectedOrgTypeOption = value;
    if (this.selectedOrgTypeOption === 'yes') {
      this.orgTypeRoot = true;
      this.orgTypeSubOrg = false;
    } else {
      this.orgTypeRoot = false;
      this.orgTypeSubOrg = true;
    }
  }

  saveUser() {
    console.log(this.addEditUserForm.value)
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
        { severity: 'success', detail: response.params.status }
      ];
      this.ref.close(this.addEditUserForm.value);
    }, (error) => {
      this.messages = [
      ];
      this.messageService.add({ severity: 'error', detail: error.error.params.errmsg })
    })
  }
}