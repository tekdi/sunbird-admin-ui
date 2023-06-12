import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserLoginService {

  constructor(private http: HttpClient) { }

  userLogIn(username: string, password: string): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/x-www-form-urlencoded'
    })

    let body = new URLSearchParams();
    body.set('client_id', environment.client_id);
    body.set('grant_type', environment.grant_type);
    body.set('client_secret', environment.client_secret);
    body.set('username', username);
    body.set('password', password);
  
    return this.http.post('auth/realms/sunbird/protocol/openid-connect/token', body.toString(), { headers: header })
  }
}