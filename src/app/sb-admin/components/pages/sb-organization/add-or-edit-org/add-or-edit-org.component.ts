import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-add-or-edit-org',
  templateUrl: './add-or-edit-org.component.html',
  styleUrls: ['./add-or-edit-org.component.scss']
})
export class AddOrEditOrgComponent {
  addEditOrgForm: FormGroup;
  submitted: boolean = false;
  messages!: Message[];
  organizationType: any;

  constructor(public formBuilder: FormBuilder, public ref: DynamicDialogRef, private addOrgservice: OrganizationListService) {
    this.addEditOrgForm = formBuilder.group({
      orgName: ['', Validators.required],
      description: ['', Validators.required],
      channel: ['', Validators.required],
      organisationType: ['', Validators.required],
      isRootOrg: true,
      isTenant: true
    })
  }
  ngOnInit() {
    this.organizationType = [
      { name: 'school', value: 'school' },
      { name: 'board', value: 'board' }
    ]
  }

  cancel() {
    this.ref.close();
  }

  saveOrg() {
    this.submitted = true;
    if (this.addEditOrgForm.invalid) {
      this.messages = [
        { severity: 'error', detail: 'Fields should not be blank' }
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
      if (error.status = 400) {
        this.messages = [
          { severity: 'error', detail: 'Channel Already Exit' }
        ]
      }
    })
  }
}

