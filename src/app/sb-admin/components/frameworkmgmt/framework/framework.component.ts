import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/sb-admin/service/user.service';
import { Subscription } from 'rxjs';
import { SearchFilterValue } from 'src/app/sb-admin/interfaces/user';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { FrameworkService } from 'src/app/sb-admin/service/framework.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  private subscription!: Subscription;
  createFramework!: FormGroup;
  submitted = false;
  messages: Message[] = [];
  organizations: any[] = [];
  selectedOrg: any[] = [];
  first = 0;
  orgId: any;
  frameworks: any[] = [];
  rootOrgId: any;

  constructor(
    private frameworkService: FrameworkService,
    private userService: UserService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private i18nextPipe: I18NextPipe,
  ) {}

  ngOnInit() {
    this.initializeAddForm();
    this.rootOrgId= sessionStorage.getItem("rootOrgId")
    this.getFramework()
  }

  initializeAddForm() {
    this.createFramework = this.formBuilder.group({
      filteredValue: ['', Validators.required],
      frameworkName: ['', Validators.required],
      frameworkCode: ['', Validators.required],
      frameworkDesc: ['', Validators.required],
      frameworkNameDD: [],
    });
  }

  saveFramework() {
    this.submitted = true;
    const updatedFormValues = { ...this.createFramework.value };
    const body = this.createRequestBody(updatedFormValues);

    this.subscription= this.frameworkService.saveFramework(body).subscribe(
      (response) => this.handleFrameworkSaveSuccess(response),
      (error) => this.handleFrameworkSaveError(error)
    );
  }

  createRequestBody(updatedFormValues: any): any {
    return {
      "request": {
        "framework": {
          "name": updatedFormValues.frameworkName,
          "code": updatedFormValues.frameworkCode,
          "description": updatedFormValues.frameworkDesc,
          "channels": [
            {
              "identifier": this.orgId,
            },
          ],
        },
      },
    };
  }

  handleFrameworkSaveSuccess(response: any): void {
    this.messages = [];
    this.messageService.add({ severity: 'success', detail: this.i18nextPipe.transform('FRAMEWORK_ADDED') });
    this.createFramework.reset();
   
    this.submitted = false;
  }

  handleFrameworkSaveError(error: any): void {
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
        this.handleFrameworkSaveError(error);
      }
    );
  }



  onSearch1(event: any): void {
    this.first = 0;
  }

  ngOnDestroy() {
    if (this.subscription) {
     this.subscription.unsubscribe();
     }
   }
}
