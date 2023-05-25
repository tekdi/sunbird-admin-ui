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
    const body = {
      "request": this.addEditOrgForm.value
    }
    this.messages = [];
    this.addOrgservice.addOrg(body).subscribe((response) => {
      const id = response.result.organisationId
      const updatedFormValues = {
        ...this.addEditOrgForm.value,
        id: id
      };
      this.messages = [
        { severity: 'success', summary: 'success'}
      ];
      this.ref.close(updatedFormValues);
    }, (error: any) => {
      this.messages = [
        { severity: 'error', summary: 'Error'}
      ]
    })
  }
}

