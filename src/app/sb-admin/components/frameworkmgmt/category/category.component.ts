import { Component, OnInit } from '@angular/core';
import { FrameworkService } from 'src/app/sb-admin/service/framework.service';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { CategoryName, CategoryCode } from 'src/config/constant.config';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private subscription!: Subscription;
 
  readonly CategoryName = CategoryName;
  readonly CategoryCode = CategoryCode;

  createCategory!: FormGroup;
  submitted = false;
  messages: Message[] = [];
  organizations: any[] = [];
  frameworks: any[] = [];
  selectedOrg: any[] = [];
  first = 0;
  orgId: any;
  node: any;
  rootOrgId: any;

  constructor(
    private frameworkService: FrameworkService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.initializeAddForm();
    this.rootOrgId= sessionStorage.getItem("rootOrgId")
    this.getFramework();
  }

  initializeAddForm() {
    this.createCategory = this.formBuilder.group({
      filteredValue: [null, Validators.required],
      frameworkName: [null, Validators.required],
      categoryName: ['', Validators.required],
      categoryCode: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  saveCategory() {
    this.submitted = true;
    const updatedFormValues = { ...this.createCategory.value };
    this.mapCategoryCode(updatedFormValues);
    const body = {
      "request": {
        "category": {
          "name": updatedFormValues.categoryName,
          "description": updatedFormValues.description,
          "code": updatedFormValues.categoryCode
        }
      }
    };
    this.subscription=this.frameworkService.createCategory(body, updatedFormValues.frameworkName).subscribe(
      (response) => {
        this.handleCategoryCreationSuccess(response);
      },
      (error) => {
        this.handleCategoryCreationError(error);
      }
    );
  }
// Maps human-readable category codes to their corresponding system identifiers.
  mapCategoryCode(updatedFormValues: any): void {
    const categoryCodeMap: { [key: string]: string } = {
      "Grade": "gradeLevel",
      "Board": "board",
      "Medium": "medium",
      "Subject": "subject"
    };

    if (categoryCodeMap[updatedFormValues.categoryCode]) {
      updatedFormValues.categoryCode = categoryCodeMap[updatedFormValues.categoryCode];
    }
  }

  handleCategoryCreationSuccess(response: any): void {
    this.node = response.result.node_id;
    this.messages = [];
    this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('FRAMEWORK_ADDED') });
    this.createCategory.reset();
    this.submitted = false;
  }

  handleCategoryCreationError(error: any): void {
    this.submitted = false;
    this.messages = [];
    this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
  }

  getFramework(): void {
    this.subscription = this.frameworkService.getChannel(this.rootOrgId).subscribe(
      (response: any) => {
        this.frameworks = response?.result?.channel?.frameworks;
      },
      (error) => {
        this.handleCategoryCreationError(error);
      }
    );
  }

   ngOnDestroy() {
       if (this.subscription) {
         this.subscription.unsubscribe();
       }
     }

}
