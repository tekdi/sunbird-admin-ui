import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import config from 'src/config/url.config.json';
import { SessionStorageService } from './login.service';

@Injectable()
export class UserService {
  private accessToken: any;
  private authToken: any;
  private targeturl: any;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.accessToken = this.sessionStorageService.getAccessToken();
    this.authToken = this.sessionStorageService.getAuthToken();
    this.targeturl = this.sessionStorageService.getTargetUrl();
  }

  private getCommonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
      'x-authenticated-user-token': this.accessToken,
    });
  }


  private handlePostUrl(url: string, data: any): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.post(url, data, { headers: headers });
  }

  private handlePatchUrl(url: string, data: any): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.patch(url, data, { headers: headers });
  }

  private handleGetUrl(url: string): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.get(url, { headers: headers });
  }


  getOrganizations(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.ORGNIZATION_SEARCH_URL}`,
      body
    );
  }


  loadUserList(body: any): Observable<any> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.USER_SEARCH_URL}`,
      body
    );
  }

  saveUserRole(payload: any): Observable<any> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.USER_UPDATE_ROLE_URL}`,
      payload
    );
  }

 
  addNewUser(payload: any): Observable<any> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.USER_CREATE_URL}`,
      payload
    );
  }

  blockUnblockUser(payload: any, userStatus: any): Observable<any> {
    const url = userStatus
      ? `${this.targeturl}/${config.URLS.USER_BLOCK_URL}`
      : `${this.targeturl}/${config.URLS.USER_UNBLOCK_URL}`;

    return this.handlePostUrl(url, payload);
  }


  getAllUserRoles(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.USER_ROLES_GET_URL}`,
      body
    );
  }


  getUsersCountByRole(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.USER_SEARCH_URL}`,
      body
    );
  }


}
