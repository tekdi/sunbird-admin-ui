import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import config from 'src/config/url.config.json';
import { SessionStorageService } from './login.service';

@Injectable()
export class FrameworkService {
  public accessToken: any;
  public authToken: any;
  public targeturl: any;

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
  private handlePostUrlwithoutheader(url: string, data: any): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.post(url, data);
  }

  private handlePatchUrl(url: string, data: any): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.patch(url, data, { headers: headers });
  }

  private handleGetUrl(url: string): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.get(url, { headers: headers });
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
  const urlWithParams = `${this.targeturl}/${config.URLS.GET_USER_DETAILS}/${payload}`;
  return this.handleGetUrl(urlWithParams);
}

getContentdetails(body: any): Observable<Object> {
  return this.handlePostUrlwithoutheader(
    `${this.targeturl}/${config.URLS.GET_ORG_CONTENT}`,
    body
  );
}
getCategorydetails(data: any): Observable<Object> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authToken,
    'X-Channel-Id': 'sunbird',
});
const urlWithParams = `${this.targeturl}/${config.URLS.GET_CATEGORY}/${data.termName}?framework=${data.frameworkName}`;
return this.http.get(urlWithParams, { headers: headers });
  }

  createAssociation(payload: any, data: any) : Observable<Object> {
    const urlWithParams = `${this.targeturl}/${config.URLS.CREATE_ASSOCIATION}/${data.termName}?framework=${data.frameworkName}&category=${data.categoryName}`;
    return this.handlePatchUrl(urlWithParams, payload);

  }

}
