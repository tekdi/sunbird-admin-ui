import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { MatomoTracker } from 'ngx-matomo';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  // private readonly matomoTracker = inject(MatomoTracker);

  public readonly getUserIdCode = 'this.matomoTracker.getUserId().then(console.log);';
  public readonly setUserIdCode = "this.matomoTracker.setUserId('MyUserId');";
  public readonly resetUserIdCode = 'this.matomoTracker.resetUserId();';
  login!: FormGroup;
  submitted = false;
  messages!: Message[];
  private subscription!: Subscription;
  rootOrgId: any;
  userData: any;
  roleData: any;
  isAdmin:any = false;
  isCreator:any=false;
  constructor(
    private i18nextPipe: I18NextPipe,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private messageService: MessageService,
    private userService : UserService,
    private matomoTracker: MatomoTracker

  ) {}

  ngOnInit() {
    this.initializeAddForm();
  }

  initializeAddForm() {
    this.login = this.formBuilder.group({
      authToken: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      targetURL: ['', Validators.required],
      clientSecret:['',Validators.required]
    });
  }

  
  saveLogin() {
    this.matomoTracker.trackEvent('Login', 'Button pressed', 'Login');
    this.submitted = true;
    const updatedFormValues = { ...this.login.value };
    const { authToken, targetURL } = updatedFormValues;
    const sanitizedTargetUrl = targetURL.endsWith('/')
      ? targetURL.slice(0, -1)
      : targetURL;
    this.sessionStorageService.setAuthToken(authToken);
    this.sessionStorageService.setTargetUrl(sanitizedTargetUrl);
    const body = {
      "client_id": 'implementation',
      "client_secret": updatedFormValues.clientSecret,
      "grant_type": 'password',
      "username": updatedFormValues.userName,
      "password": updatedFormValues.password,
    };
    this.subscription = this.sessionStorageService.userLogin(body).subscribe((response: any) => {
      if (response) {
        const accessToken = response.access_token;
        this.sessionStorageService.setAccessToken(accessToken);
        const decodedToken = this.sessionStorageService.decodeToken(accessToken);
        const lastIndex = decodedToken.sub.lastIndexOf(':');
        const secondPart = decodedToken.sub.substring(lastIndex + 1);
        const roles: string[] = [];
        this.userService.getUserdata(secondPart).subscribe((response: any) => {
          if (response) {
            this.userData = response.result.response;
            this.rootOrgId = response.result.response.rootOrgId;
            sessionStorage.setItem("rootOrgId", this.rootOrgId);
            this.roleData = response.result.response.organisations;
            if (this.roleData) {
              for (const orgId in this.roleData) {
                const org = this.roleData[orgId];
                if (org.roles && org.roles.length > 0) {
                  roles.push(...org.roles);
                }
              }
            }
            if (roles.includes("ORG_ADMIN")) {
              this.isAdmin = true;
              this.router.navigate(['/dashboard']);
            } else if (roles.includes("CONTENT_CREATOR")) {
              this.isCreator = true;
              this.router.navigate(['/inviteonly/batchupdate']);
            } else {
              this.messages = [];
              alert("The user does not have admin role");
            }
            sessionStorage.setItem("isAdmin", this.isAdmin);
            sessionStorage.setItem("isCreator", this.isCreator);
          }
        });
      }
    }, (error) => {
      this.messages = [];
      this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg });
    });
  }
}
