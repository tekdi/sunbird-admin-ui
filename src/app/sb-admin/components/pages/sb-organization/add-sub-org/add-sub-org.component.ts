import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { I18NextPipe } from 'angular-i18next';
import { Validators } from '@angular/forms';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Message } from 'primeng/api';
import { UserService } from 'src/app/sb-admin/service/user.service';

@Component({
  selector: 'app-add-sub-org',
  templateUrl: './add-sub-org.component.html',
  styleUrls: ['./add-sub-org.component.scss']
})
export class AddSubOrgComponent {
  addSubOrg: FormGroup;
  submitted: boolean = false;
  messages!: Message[];
  organizations: any[] = [];
  selectedOrg: any[] = []

  constructor(public formBuilder: FormBuilder, public ref: DynamicDialogRef, private addSUBOrg: OrganizationListService, private orgList: UserService, private i18nextPipe: I18NextPipe) {
    this.addSubOrg = formBuilder.group({
      rootOrgName: ['', Validators.required],
      orgName: ['', Validators.required],
      description: ['', Validators.required],
      organisationType: 'school',
      isRootOrg: false,
      isTenant: false
    })
  }

  ngOnInit(): void {
    this.getOrganizations();
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
    this.orgList.getOrganizations(body).subscribe(
      (data: any) => {
        this.organizations = data?.result?.response?.content;
      });
  }

  saveSubOrg() {
    this.submitted = true;
    if (this.addSubOrg.invalid) {
      this.messages = [
        { severity: 'error', summary: this.i18nextPipe.transform('ADD_ORGANIZATION_BLANK_FIELD_MSG') }
      ];
      return;
    }
    const selectOrgName = this.addSubOrg.value.rootOrgName;
    this.selectedOrg = this.organizations.filter(org => org.orgName === selectOrgName)
    const channel = this.selectedOrg[0].channel;
    const rootOrgId = this.selectedOrg[0].id;
    const updatedFormValue = {
      ...this.addSubOrg.value,
      channel: channel,
      rootOrgId: rootOrgId
    }
    delete(updatedFormValue.rootOrgName)
    const body = {
      "request": updatedFormValue
    }
    this.addSUBOrg.addSubOrg(body).subscribe((response) => {
      console.log(response);
      this.ref.close(updatedFormValue);
    },
      (error: any) => {
        this.messages = [
          { severity: 'error', summary: this.i18nextPipe.transform('ADD_SUB_ORGANIZATION_ALREADY_EXIT') }
        ]
      }
    )
  }

  cancel() {
    this.ref.close();
  }

}
