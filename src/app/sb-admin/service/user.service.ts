import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import config from 'src/config/url.config.json';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getOrganizations(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json'
    })
    return this.http.post(config.URLS.ORGNIZATION_SEARCH_URL, body, { headers: header })
  }

  getOrganizationUserList(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(config.URLS.USER_SEARCH_URL, body, { headers: header })
  }

  saveUserRole(payload: any): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(config.URLS.USER_UPDATE_ROLE_URL, payload, { headers: header });
  }
  addNewUser(payload: any): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(config.URLS.USER_CREATE_URL, payload, { headers: header });
  }

  blockUnblockUser(payload: any, userStatus: any): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    if (userStatus) {
      return this.http.post(config.URLS.USER_BLOCK_URL, payload, { headers: header });
    } else {
      return this.http.post(config.URLS.USER_UNBLOCK_URL, payload, { headers: header });
    }
  }

  getAllUserRole(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(environment.allUserRoleUrl, body, { headers: header })
  }

  getUserRoleCount(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(environment.userRoleCount, body, { headers: header })
  }
}
