import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { I18NextPipe } from 'angular-i18next';

import { UserService } from 'src/app/sb-admin/service/user.service';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { CategoryName, CategoryCode } from 'src/config/constant.config';
import { FrameworkService } from 'src/app/sb-admin/service/framework.service';

@Component({
  selector: 'app-term',
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
  CATEGORY_NAME_MAPPING: { [key: string]: string } = {
    "Grade": "gradeLevel",
    "Board": "board",
    "Medium": "medium",
    "Subject": "subject"
  };
  rootOrgId:any;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe,
    private frameworkService: FrameworkService,
  ) {}

  ngOnInit() {
    this.initializeAddForm();
    this.rootOrgId= sessionStorage.getItem("rootOrgId")
    this.getFramework()
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
   this.subscription= this.frameworkService.createTerm(body, updatedFormValues).subscribe(
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
        this.handleCategoryCreationError(error);
      }
    );
  }
// Maps human-readable category names to their corresponding system identifiers.

mapCategoryNames(updatedFormValues: any): void {
  const categoryName = updatedFormValues.categoryName;
  if (this.CATEGORY_NAME_MAPPING.hasOwnProperty(categoryName)) {
    updatedFormValues.categoryName = this.CATEGORY_NAME_MAPPING[categoryName];
  }
}
 
  getFramework(): void {
    this.subscription = this.frameworkService.getChannel(this.rootOrgId).subscribe(
      (response: any) => {
        this.frameworks = response?.result?.channel?.frameworks;
      },
      (error: any) => {
        this.handleCategoryCreationError(error);
      }
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
          this.subscription.unsubscribe();
        }
  }

  handleCategoryCreationError(error: any): void {
    this.submitted = false;
    this.messages = [];
    this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
  }
}
