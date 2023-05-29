import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Message } from 'primeng/api';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'app-add-or-edit-org',
  templateUrl: './add-or-edit-org.component.html',
  styleUrls: ['./add-or-edit-org.component.scss']
})
export class AddOrEditOrgComponent {
  addEditOrgForm: FormGroup;
  submitted: boolean = false;
  messages!: Message[];

  constructor(public formBuilder: FormBuilder, public ref: DynamicDialogRef, private addOrgservice: OrganizationListService,private i18nextPipe: I18NextPipe) {
    this.addEditOrgForm = formBuilder.group({
      orgName: ['', Validators.required],
      description: ['', Validators.required],
      channel: ['', Validators.required],
      organisationType: 'board',
      isRootOrg: true,
      isTenant: true
    })
  }

  cancel() {
    this.ref.close();
  }

  saveOrg() {
    this.submitted = true;
    if (this.addEditOrgForm.invalid) {
      this.messages = [
        { severity: 'error',summary:this.i18nextPipe.transform('ADD_ORGANIZATION_BLANK_FIELD_MSG')}
      ];
      return;
    }
    const body = {
      "request": this.addEditOrgForm.value
    }
    this.addOrgservice.addOrg(body).subscribe((response) => {
      const id = response.result.organisationId
      const updatedFormValues = {
        ...this.addEditOrgForm.value,
        id: id
      };
      this.ref.close(updatedFormValues);
    }, (error: any) => {
        this.messages = [
          { severity: 'error',summary: this.i18nextPipe.transform('ADD_ORGANIZATION_ALREADY_EXIT')}
        ]
      }
   )
  }
}

