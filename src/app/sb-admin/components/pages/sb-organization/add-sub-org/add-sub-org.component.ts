import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { I18NextPipe } from 'angular-i18next';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { Message } from 'primeng/api';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-sub-org',
  templateUrl: './add-sub-org.component.html',
  styleUrls: ['./add-sub-org.component.scss']
})
export class AddSubOrgComponent {
  addSubOrg!: FormGroup;
  submitted: boolean = false;
  messages!: Message[];
  organizations: any[] = [];
  selectedOrg: any[] = []
  private subscription: Subscription | any;

  constructor(public formBuilder: FormBuilder, public dynamicDialogRef: DynamicDialogRef, private organizationListService: OrganizationListService, private orgList: UserService, private i18nextPipe: I18NextPipe) {
    this.addSubOrg = formBuilder.group({
      channel: ['', Validators.required],
      orgName: ['', Validators.required],
      description: ['', Validators.required],
      organisationType: 'board',
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
    this.subscription = this.orgList.getOrganizations(body).subscribe(
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
    const body = {
      "request": this.addSubOrg.value
    }
    this.organizationListService.addSubOrg(body).subscribe((response) => {
      this.dynamicDialogRef.close(this.addSubOrg.value);
    },
      (error: any) => {
        this.messages = [
          { severity: 'error', summary: this.i18nextPipe.transform('ADD_SUB_ORGANIZATION_ALREADY_EXIT') }
        ]
      });
  }

  cancel() {
    this.dynamicDialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
