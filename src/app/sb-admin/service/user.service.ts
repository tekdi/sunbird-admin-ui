import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getOrganizations(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json'
    })
    return this.http.post(environment.orgUrl, body)
  }

  getOrganizationUserList(body: any): Observable<Object> {
    return this.http.post(environment.userUrl, body)
  }

  saveUserRole(payload: any): Observable<any> {
    return this.http.post(environment.userUpdateRoleUrl, payload);
  }
  addNewUser(payload: any): Observable<any> {
    return this.http.post(environment.userCreateUrl, payload);
  }
}
