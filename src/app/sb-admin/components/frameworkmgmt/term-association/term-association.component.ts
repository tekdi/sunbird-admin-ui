import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { CategoryName, CategoryCode } from 'src/config/constant.config';
import { FrameworkService } from 'src/app/sb-admin/service/framework.service';
import { read, utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-term-association',
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
  rootOrgId: any;
  jsonData: any;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe,
    private frameworkService: FrameworkService
  ) {}

  ngOnInit() {
    this.initializeAddForm();
    this.rootOrgId= sessionStorage.getItem("rootOrgId")
    this.getFramework()
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
      board: ['', []],
      medium: ['', []],
      grade: ['', []],
      subject: ['', []]
    });

    this.createCategory = this.formBuilder.group({
      categoryName: ['', Validators.required], // Initialize as an empty array for multiple selection
      frameworkName: [null, Validators.required],
      filteredValue: [null, Validators.required],
      termName: [null]
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


  getFramework(): void {
    this.subscription = this.userService.getChannel( this.rootOrgId).subscribe(
      (response: any) => {
        this.frameworks = response?.result?.channel?.frameworks;
      },
      (error) => {
        this.handleCategoryCreationError(error);
      }
    );
  }


  onSearch1(event: any): void {
    this.first = 0;
    this.getCategory(event.value)
  }

  onSearch2(event:any):void{
    const dropdownmediumResults =[
          {
              "item_id": "chattisgarghboardfw_board_westbengalboard",
              "item_text": "West Bengal Board of Secondary Education"
          },
          {
              "item_id": "chattisgarghboardfw_board_chattisgarghboardfw",
              "item_text": "Chattisgargh  Board of Secondary Education"
          }
      ]
      const dropdowngradeResults =[
          {
              "item_id": "chattisgarghboardfw_gradelevel_class7",
              "item_text": "Class 7"
          },
          {
              "item_id": "chattisgarghboardfw_gradelevel_class6",
              "item_text": "Class 6"
          }
      ]
      const dropdownsubjectResults =[
        {
          "item_id": "chattisgarghboardfw_subject_marathi",
          "item_text": "Marathi"
      },
      {
          "item_id": "chattisgarghboardfw_subject_english",
          "item_text": "English"
      }
    ]
  
      if(event.value=="Medium"){
        // this.mediumSelect=false;
        // this.boardSelect=true;
        // this.grade=true;
        // this.subject=true;
      const mediumresult1 = dropdownmediumResults.map((item: { item_id: string }) => {
        const parts = item.item_id.split('_');
        const newItemId = parts[parts.length - 1]; // Get the last part after splitting by underscore
        return {
          item: newItemId
        };
      });
      this.termName=mediumresult1
      }
      else if(event.value == "Grade"){
        // this.mediumSelect=true;
        // this.boardSelect=true;
        // this.grade=false;
        // this.subject=true;
        const mediumresult1 = dropdowngradeResults.map((item: { item_id: string }) => {
        const parts = item.item_id.split('_');
        const newItemId = parts[parts.length - 1]; // Get the last part after splitting by underscore
        return {
          item: newItemId
        };
      });
      this.termName=mediumresult1
      }
      else if(event.value == "Subject"){
        // this.mediumSelect=true;
        // this.boardSelect=true;
        // this.grade=true;
        // this.subject=false;
        const mediumresult1 = dropdownsubjectResults.map((item: { item_id: string }) => {
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

  handleButtonClick() {
    const updatedFormValues = { ...this.createCategory.value };
    const form = { ...this.form.value };
    const associationsWithArray = this.jsonData
        .map((item: any) => item["associationswith"])
        .filter((item: any) => item.trim() !== "")
        .map((item: any) => ({ identifier: item }));

    let associationsArray = this.jsonData
        .map((item: any) => item["associations "])
        .filter((item: any) => item.trim() !== "")
        .map((item: any) => ({ identifier: item }));

    console.log("associationswith array:", associationsWithArray);
    console.log("associations array:", associationsArray);

    if (this.createCategory.valid && this.form.valid) {
        let requestBody: any;

        switch (updatedFormValues.categoryName) {
            case "Medium":
            case "Grade":
                requestBody = {
                    request: {
                        term: {
                            associationswith: associationsWithArray,
                            associations: associationsArray
                        }
                    }
                };
                break;
            case "Subject":
                requestBody = {
                    request: {
                        term: {
                            associationswith: associationsWithArray
                        }
                    }
                };
                break;
        }

        console.log("this.requestBody", requestBody);
        this.mapCategoryNames(updatedFormValues);

        this.subscription = this.frameworkService.createAssociation(requestBody, updatedFormValues).subscribe(
            (response: any) => {
                this.organizations = response?.result?.response?.content;
            },
            (error) => {
                this.handleCategoryCreationError(error);
            }
        );
    } else {
        this.messageService.add({ severity: 'error', detail: 'Please fill in all required fields.' });
    }
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

  csvImport(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt) => {
        const csvData: string | undefined = evt?.target?.result as string;
        if (csvData) {
          this.jsonData = this.csvToJson(csvData);
          console.log("this.json",this.jsonData)
        } else {
          console.error('Error: Unable to read file');
        }
      };
      reader.onerror = (error) => {
        console.error('Error occurred while reading file:', error);
      };
    }
  }

  csvToJson(csvData: string): any[] {
    const lines = csvData.split('\n');
    const result: any[] = [];
    const headers = lines[0].split(',');
  
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue; // Skip empty lines
      const obj: any = {}; // Type annotation for obj
      const currentLine = lines[i].split(',');
  
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
  
      result.push(obj);
    }
  
    return result;
  }
  
  


}