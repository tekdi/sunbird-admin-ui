import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { CategoryName, CategoryCode } from 'src/config/constant.config';
import { FrameworkService } from 'src/app/sb-admin/service/framework.service';
@Component({
  selector: 'app-term-asociation',
  templateUrl: './term-association.component.html',
  styleUrls: ['./term-association.component.scss']
})
export class TermAssociationComponent implements OnInit {
  private subscription!: Subscription;
  readonly CategoryName = CategoryName;
  readonly CategoryCode = CategoryCode;
  createCategory!: FormGroup;
  submitted = false;
  messages: Message[] = [];
  organizations: any[] = [];
  frameworks: any[] = [];
  first: number | undefined;
  orgId: any;
  boardResults: any[] = [];
  mediumResults: any[] = [];
  gradeLevelResults: any[] = [];
  subjectResults: any[] = [];
  boardResultsdrop: any;
  dropdownList: any;
  dropdownmediumResults:any;
  dropdownSettings:any;
  dropdowngradeResults:any;
  dropdownsubjectResults:any;
  form!: FormGroup;
  filteredCategories:any;
  termName: any;
  mediumSelect=false;
  boardSelect=false;
  grade=false;
  subject=false;
  requestBody:any;
  CATEGORY_NAME_MAPPING: { [key: string]: string } = {
    "Grade": "gradeLevel",
    "Board": "board",
    "Medium": "medium",
    "Subject": "subject"
  };
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe,
    private frameworkService: FrameworkService
  ) {}

  ngOnInit() {
    this.initializeAddForm();
    this.getOrganizations();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
  }
  

  initializeAddForm() {

    this.form = this.formBuilder.group({
      board : ['',[Validators.required]],
      medium:['',[Validators.required]],
      grade:['',[Validators.required]],
      subject:['',[Validators.required]]
    })
    this.createCategory = this.formBuilder.group({
      categoryName: ['', Validators.required], // Initialize as an empty array for multiple selection
      frameworkName: [null, Validators.required],
      filteredValue: [null, Validators.required],
      termName:[null,Validators.required]
    });
    this.filteredCategories = this.CategoryName.filter(category => category.name !== 'Board');

  }

  handleCategoryCreationSuccess(response: any): void {
    this.messages = [];
    this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('FRAMEWORK_PUBLISHED') });
    this.createCategory.reset();
    this.submitted = false;
  }

  handleCategoryCreationError(error: any): void {
    this.submitted = false;
    this.messages = [];
    this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
  }

  getOrganizations() {
    const body = {
      "request": {
        "filters": {
          "isRootOrg": true
        }
      }
    };

    this.subscription = this.userService.getOrganizations(body).subscribe(
      (response: any) => {
        this.organizations = response?.result?.response?.content;
      },
      (error) => {
        this.handleCategoryCreationError(error);
      }
    );
  }

  getFramework(org: any): void {
    this.subscription = this.userService.getChannel(org).subscribe(
      (response: any) => {
        this.frameworks = response?.result?.channel?.frameworks;
      },
      (error) => {
        this.handleCategoryCreationError(error);
      }
    );
  }

  onSearch(event: any): void {
    this.first = 0;
    const selectedOrganization = this.organizations.find(org => org.orgName === event.value);
    if (selectedOrganization) {
      this.orgId = selectedOrganization.id;
      this.getFramework(this.orgId);
    }
  }

  onSearch1(event: any): void {
    this.first = 0;
    this.getCategory(event.value)
  }

  onSearch2(event:any):void{
    if(event.value=="Medium"){
      this.mediumSelect=false;
      this.boardSelect=true;
      this.grade=true;
      this.subject=true;
    const mediumresult1 = this.dropdownmediumResults.map((item: { item_id: string }) => {
      const parts = item.item_id.split('_');
      const newItemId = parts[parts.length - 1]; // Get the last part after splitting by underscore
      return {
        item: newItemId
      };
    });
    this.termName=mediumresult1
    }
    else if(event.value == "Grade"){
      this.mediumSelect=true;
      this.boardSelect=true;
      this.grade=false;
      this.subject=true;
      const mediumresult1 = this.dropdowngradeResults.map((item: { item_id: string }) => {
      const parts = item.item_id.split('_');
      const newItemId = parts[parts.length - 1]; // Get the last part after splitting by underscore
      return {
        item: newItemId
      };
    });
    this.termName=mediumresult1
    }
    else if(event.value == "Subject"){
      this.mediumSelect=true;
      this.boardSelect=true;
      this.grade=true;
      this.subject=false;
      const mediumresult1 = this.dropdownsubjectResults.map((item: { item_id: string }) => {
        const parts = item.item_id.split('_');
        const newItemId = parts[parts.length - 1]; // Get the last part after splitting by underscore
        return {
          item: newItemId
        };
      });
      this.termName=mediumresult1
    }
    else{
      this.mediumSelect=false;
      this.boardSelect=false;
      this.grade=false;
      this.subject=false;
    }
  }

  getCategory(org : any): void {
    this.CategoryCode.forEach(category => {
      const data = {
        "termName": category.value,
        "frameworkName": org
      };
      this.subscription = this.frameworkService.getCategorydetails(data).subscribe(
        (response: any) => {
          switch (category.value) {
            case "board":
              this.boardResults.push(...response.result.category?.terms);
              break;
            case "medium":
              this.mediumResults.push(...response.result.category?.terms);
              break;
            case "gradeLevel":
              this.gradeLevelResults.push(...response.result.category?.terms);
              break;
            case "subject":
              this.subjectResults.push(...response.result.category?.terms);
              break;
            default:
              break;
          }
          this.dropdownList = this.getData(this.boardResults);
          this.dropdownmediumResults=this.getDatamedium(this.mediumResults)
          this.dropdowngradeResults=this.getDatagrade(this.gradeLevelResults)
          this.dropdownsubjectResults=this.getDatasubject(this.subjectResults)
        },
        (error) => {
          this.handleCategoryCreationError(error);
        }
      );
    });
  }

  getData(data:any) : Array<any>{
    return data.map((item: { identifier: any; name: any; }) => {
      return { item_id: item.identifier, item_text: item.name };
    });
  }
  getDatasubject(data:any) : Array<any>{
    return data.map((item: { identifier: any; name: any; }) => {
      return { item_id: item.identifier, item_text: item.name };
    });
  }
  getDatamedium(data:any) : Array<any>{
    return data.map((item: { identifier: any; name: any; }) => {
      return { item_id: item.identifier, item_text: item.name };
    });
  }
  getDatagrade(data:any) : Array<any>{
    return data.map((item: { identifier: any; name: any; }) => {
      return { item_id: item.identifier, item_text: item.name };
    });
  }


  handleButtonClick(){
    const updatedFormValues = { ...this.createCategory.value };
   
    const form = { ...this.form.value };
    let associationswith: any[] = [];
    let associations: any[] = [];
    switch (updatedFormValues.categoryName) {
      case "Medium":
        associationswith = form.board.map((item: { item_id: any }) => ({ identifier: item.item_id }));
        associations = form.grade.map((item: { item_id: any }) => ({ identifier: item.item_id }))
          .concat(form.subject.map((item: { item_id: any }) => ({ identifier: item.item_id })));
        break;
      case "Grade":
        associationswith = form.board.map((item: { item_id: any }) => ({ identifier: item.item_id }))
          .concat( form.medium.map((item: { item_id: any }) => ({ identifier: item.item_id })));
        associations = form.subject.map((item: { item_id: any }) => ({ identifier: item.item_id }));
        break;
    case "Subject":
    associationswith = form.board.map((item: { item_id: any }) => ({ identifier: item.item_id }))
                      .concat(form.medium.map((item: { item_id: any }) => ({ identifier: item.item_id })))
                      .concat(form.grade.map((item: { item_id: any }) => ({ identifier: item.item_id })));
    break;
    }
    const requestBody = {
      request: {
        term: {
          associationswith: associationswith,
          associations: associations
        }
      }
    };

    this.requestBody = requestBody;
    this.mapCategoryNames(updatedFormValues);
    this.subscription = this.frameworkService.createAssociation(this.requestBody, updatedFormValues).subscribe(
      (response: any) => {
        this.organizations = response?.result?.response?.content;
      },
      (error) => {
        this.handleCategoryCreationError(error);
      }
    );

}
mapCategoryNames(updatedFormValues: any): void {
  const categoryName = updatedFormValues.categoryName;
  if (this.CATEGORY_NAME_MAPPING.hasOwnProperty(categoryName)) {
    updatedFormValues.categoryName = this.CATEGORY_NAME_MAPPING[categoryName];
  }
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}