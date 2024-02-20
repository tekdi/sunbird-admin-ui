import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  submitted = false;
  messages!: Message[];
  private subscription!: Subscription;
  constructor(
    private i18nextPipe: I18NextPipe,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private messageService: MessageService,

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



  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  saveLogin() {
    this.submitted = true;
    const updatedFormValues = { ...this.login.value };
    const { authToken, targetURL } = updatedFormValues;
    const sanitizedTargetUrl = targetURL.endsWith('/')
      ? targetURL.slice(0, -1)
      : targetURL;
    this.sessionStorageService.setAuthToken(authToken);
    this.sessionStorageService.setTargetUrl(sanitizedTargetUrl);
    const body = this.createRequestBody(updatedFormValues, sanitizedTargetUrl);
    this.subscription = this.sessionStorageService.userLogin(body).subscribe((response: any) => {
      if ('access_token' in response && 'expires_in' in response) {
          const accessToken = (response as any).access_token;
          this.sessionStorageService.setAccessToken(accessToken);
          this.router.navigate(['/dashboard']);
        }
    }, (error) => {
      this.messages = [];
      this.messageService.add({ severity: 'error', detail: error?.error?.params?.errmsg })
    }
    );
  }

  private createRequestBody(values: any, targetUrl: string): URLSearchParams {
    const body = new URLSearchParams();
    body.set('client_id', 'implementation');
    body.set('client_secret', values.clientSecret);
    body.set('grant_type', 'password');
    body.set('username', values.userName);
    body.set('password', values.Password);

    return body;
  }
}
