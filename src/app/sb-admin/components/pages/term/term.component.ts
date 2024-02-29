import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { I18NextPipe } from 'angular-i18next';

import { UserService } from 'src/app/sb-admin/service/user.service';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { CategoryName, CategoryCode } from 'src/config/constant.config';

@Component({
  selector: 'app-tern',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {
  private subscription!: Subscription;
  createTerm!: FormGroup;
  submitted = false;
  messages: Message[] = [];
  organizations: any[] = [];
  frameworks: any[] = [];
  selectedOrg: any[] = [];
  filteredValue = SearchFilterValue;
  filtered1Value = SearchFilterValue;
  first = 0;
  orgId: any;
  CategoryName = CategoryName;
  CategoryCode = CategoryCode;
  node: any;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe
  ) {}

  ngOnInit() {
    this.initializeAddForm();
    this.getOrganizations();
  }

  initializeAddForm() {
    this.createTerm = this.formBuilder.group({
      filteredValue: [null, Validators.required],
      frameworkName: [null, Validators.required],
      categoryName: ['', Validators.required],
      termCode: ['', Validators.required],
      termName: ['', Validators.required],
      termLabel: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  saveTerm() {
    this.submitted = true;
    const updatedFormValues = { ...this.createTerm.value };
    this.mapCategoryNames(updatedFormValues);

    const body = {
      request: {
        term: {
          name: updatedFormValues.termName,
          label: updatedFormValues.termLabel,
          description: updatedFormValues.description,
          code: updatedFormValues.termCode
        }
      }
    };
    this.userService.createTerm(body, updatedFormValues).subscribe(
      (response) => {
        this.node = response.result.node_id;
        this.messages = [];
        this.messageService.add({
          severity: 'success',
          detail: this.i18nextPipe.transform('FRAMEWORK_ADDED')
        });
        this.createTerm.reset();
        this.filteredValue = null;
        this.submitted = false;
      },
      (error) => {
        this.submitted = false;
        this.messages = [];
        this.messageService.add({
          severity: 'error',
          detail: error?.error?.params?.errmsg
        });
      }
    );
  }

  mapCategoryNames(updatedFormValues: any): void {
    if (updatedFormValues.categoryName === "Grade") {
      updatedFormValues.categoryName = "gradeLevel";
    } else if (updatedFormValues.categoryName === "Board") {
      updatedFormValues.categoryName = "board";
    } else if (updatedFormValues.categoryName === "Medium") {
      updatedFormValues.categoryName = "medium";
    } else if (updatedFormValues.categoryName === "Subject") {
      updatedFormValues.categoryName = "subject";
    }
  }

  getOrganizations() {
    const body = {
      request: {
        filters: {
          isRootOrg: true
        }
      }
    };

    this.subscription = this.userService.getOrganizations(body).subscribe(
      (response: any) => {
        this.organizations = response?.result?.response?.content;
      },
      (error) => {
        this.messages = [];
        this.messageService.add({
          severity: 'error',
          detail: error?.error?.params?.errmsg
        });
      }
    );
  }

  getFramework(org: any): void {
    this.subscription = this.userService.getChannel(org).subscribe(
      (response: any) => {
        this.frameworks = response?.result?.channel?.frameworks;
      },
      (error: any) => {
        this.messages = [];
        this.messageService.add({
          severity: 'error',
          detail: error?.error?.params?.errmsg
        });
      }
    );
  }

  onSearch(event: any): void {
    this.first = 0;
    const selectedOrganization = this.organizations.find(
      (org) => org.orgName === event.value
    );
    if (selectedOrganization) {
      this.orgId = selectedOrganization.id;
      this.getFramework(this.orgId);
    }
  }

  onSearch1(event: any): void {
    this.first = 0;
  }
}
