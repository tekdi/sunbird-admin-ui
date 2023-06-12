import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserLoginService } from 'src/app/sb-admin/service/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  userLogInForm!: FormGroup;
  submitted: boolean = false;
  messages: string[] = [];

  constructor(public formBuilder: FormBuilder,
    public userLoginService: UserLoginService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userLogInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    })
  }
  
  userLogIn() {
    this.submitted = true;
    if (this.userLogInForm.invalid) {
      return
    }
    
    this.userLoginService.userLogIn(this.userLogInForm.value.username, this.userLogInForm.value.password).subscribe((response: any) => {
      sessionStorage.setItem('token', response?.access_token);
      this.router.navigate(['/']);
    },
      (error) => {
        this.messages = [];
        this.messageService.add({
          severity: 'error', detail: error?.error?.error_description
        })
      }
    )
  }
}
