import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userToken;
    if (sessionStorage.length > 0 && sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== '' && sessionStorage.getItem('token') !== null) {
      userToken = sessionStorage.getItem('token');
    }

    if (userToken) {
      request = request.clone({
        headers: request.headers.set('x-authenticated-user-token', userToken).set('Authorization', environment.authKey)
      });
    } else {
      this.router.navigate(['/login']);
    }
    return next.handle(request);
  }
}
