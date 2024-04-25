import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { CategoryName, CategoryCode } from 'src/config/constant.config';
import { FrameworkService } from 'src/app/sb-admin/service/framework.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
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
    this.createCategory = this.formBuilder.group({
      filteredValue: [null, Validators.required],
      frameworkName: [null, Validators.required],
    });
  }

  Publish() {
    this.submitted = true;
    const updatedFormValues = { ...this.createCategory.value };
    this.subscription =  this.frameworkService.publishFramework( this.orgId,updatedFormValues.frameworkName).subscribe(
      (response) => {
        this.handleCategoryCreationSuccess(response);
      },
      (error) => {
        this.handleCategoryCreationError(error);
      }
    );
  }

  handleCategoryCreationSuccess(response: any): void {
    if(response.responseCode == "OK"){
      this.node = response.result.node_id;
      this.messages = [];
      this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('FRAMEWORK_PUBLISHED') });
      this.createCategory.reset();
      this.submitted = false;
    }
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

  ngOnDestroy(){
    if (this.subscription) 
    {
      this.subscription.unsubscribe();
    }
  }

}
