import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Message } from 'primeng/api';
import { I18NextPipe } from 'angular-i18next';


@Component({
  selector: 'app-add-or-edit-org',
  templateUrl: './add-or-edit-org.component.html',
  styleUrls: ['./add-or-edit-org.component.scss']
})
export class AddOrEditOrgComponent {


  data: any;
  mode!: 'Add' | 'Edit';
  organization: any;
  addEditOrgForm: FormGroup;
  EditOrgForm: FormGroup
  submitted: boolean = false;
  messages!: Message[];

  constructor(public formBuilder: FormBuilder, public ref: DynamicDialogRef, public dialogConfig: DynamicDialogConfig, private organizationListService: OrganizationListService, private i18nextPipe: I18NextPipe) {
    this.data = this.dialogConfig.data;
    this.mode = this.data.mode;
    this.organization = this.data.organization;
    console.log(this.organization)


    this.addEditOrgForm = formBuilder.group({
      orgName: ['', Validators.required],
      description: ['', Validators.required],
      channel: ['', Validators.required],
      organisationType: 'board',
      isRootOrg: true,
      isTenant: true
    })

    this.EditOrgForm = formBuilder.group({
      orgName: [this.organization.orgName, Validators.required],
      description: [this.organization.description, Validators.required],
      organisationId: [this.organization.id]
    })
  }
  ngOnInit() {

  }

  cancel() {
    this.ref.close();
  }

  saveOrg() {
    this.submitted = true;
    if (this.addEditOrgForm.invalid) {
      this.messages = [
        { severity: 'error', summary: this.i18nextPipe.transform('ADD_ORGANIZATION_BLANK_FIELD_MSG') }
      ];
      return;
    }
    const body = {
      "request": this.addEditOrgForm.value
    }
    this.organizationListService.addOrg(body).subscribe((response) => {
      const id = response.result.organisationId
      const updatedFormValues = {
        ...this.addEditOrgForm.value,
        id: id
      };
      this.ref.close(updatedFormValues);
    }, (error: any) => {
      this.messages = [
        { severity: 'error', summary: this.i18nextPipe.transform('ADD_ORGANIZATION_ALREADY_EXIT') }
      ]
    }
    )
  }

  ediitOrg() {
    this.submitted = true;
    if (this.EditOrgForm.invalid) {
      this.messages = [
        { severity: 'error', summary: this.i18nextPipe.transform('EDIT_ORGANIZATION_BLANK_FIELD_MSG') }
      ];
      return;
    }
    const body = {
      "request": this.EditOrgForm.value
    }
    this.organizationListService.editOrg(body).subscribe((updateData) => {
      if (updateData.result.response === 'SUCCESS') {
        this.ref.close(this.EditOrgForm.value);
      }
    },
      (error: any) => {
        this.messages = [
          { severity: 'error', summary: this.i18nextPipe.transform('EDIT_ORGANIZATION_API_ERROR')  }
        ]
      }

    )
  }
}

