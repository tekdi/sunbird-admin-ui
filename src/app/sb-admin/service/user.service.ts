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
    this.initialize();
  }
  initialize(){
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
  private getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.authToken,
    });
  }


  private handlePostUrl(url: string, data: any): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.post(url, data, { headers: headers });
  }
  private handlePostUrlWithoutHeader(url: string, data: any): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.post(url, data);
  }

  private handlePatchUrl(url: string, data: any): Observable<any> {
    const headers = this.getAuthHeader();
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

  saveFramework(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
      'X-Channel-Id': payload.request.framework.channels[0].identifier,
    });

    return this.http.post(
      `${this.targeturl}/${config.URLS.CREATE_FRAMEWORK}`,
      payload,
      { headers: headers }
    );
  }


  updateFramework(payload: any, framework: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
      'X-Channel-Id': payload.request.framework.channels[0].identifier,
    });

    const url = `${this.targeturl}/${config.URLS.UPDATE_FRAMEWORK}${framework}`;
    return this.http.patch(url, payload, { headers: headers });
  }


  getChannel(payload: any): Observable<any> {
    const urlWithParams = `${this.targeturl}/${config.URLS.GET_CHANNEL}/${payload}`;
    return this.handleGetUrl(urlWithParams);
  }


  createCategory(payload: any, framework: any): Observable<any> {
    const urlWithParams = `${this.targeturl}/${config.URLS.CREATE_CATEGORY}?framework=${framework}`;
    return this.handlePostUrl(urlWithParams, payload);
  }

  getFramework(payload: any): Observable<any> {
    const urlWithParams = `${this.targeturl}/${config.URLS.GET_FRAMEWORK}/${payload}?cache=false&mode=edit`;
    return this.handleGetUrl(urlWithParams);
  }


  createTerm(payload: any, data: any): Observable<any> {
    const urlWithParams = `${this.targeturl}/${config.URLS.CREATE_TERM}?framework=${data.frameworkName}&category=${data.categoryName}`;
    return this.handlePostUrl(urlWithParams, payload);
  }

  publishFramework(payload: any, framework: any) {

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken,
        'X-Channel-Id': payload,
    });
    const url = `${this.targeturl}/${config.URLS.PUBLISH_FRAMEWORK}/${framework}`;
    return this.http.post(url, null, { headers: headers });
}
getUserdata(payload: any): Observable<any> {
  console.log("payload",payload)
  const urlWithParams = `${this.sessionStorageService.getTargetUrl()}/${config.URLS.GET_USER_DETAILS}/${payload}`;
  console.log("urlWithParams",urlWithParams,this.targeturl)
  return this.handleGetUrl(urlWithParams);
}

getContentdetails(body: any): Observable<Object> {
  return this.handlePostUrlWithoutHeader(
    `${this.targeturl}/${config.URLS.GET_ORG_CONTENT}`,
    body
  );
}
uploadblukUser(body: any): Observable<Object> {

  const headers = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    Authorization: this.authToken,
    'x-authenticated-user-token': this.accessToken,
});
const url = `${this.targeturl}/${config.URLS.BLUK_UPLOAD}`;
return this.http.post(url, null, { headers: headers });
 
}

}