import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../service/login.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  submitted = false;
  private subscription!: Subscription;
  constructor(
    private i18nextPipe: I18NextPipe,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private sessionStorageService: SessionStorageService,
   

  ) {}

  ngOnInit() {
    this.initializeAddForm();
  }

  initializeAddForm() {
    this.login = this.formBuilder.group({
      authToken: ['', Validators.required],
      userName: ['', Validators.required],
      Password: ['', Validators.required],
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
    });
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
