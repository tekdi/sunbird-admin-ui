import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import config from 'src/config/url.config.json';
import { SessionStorageService } from './login.service';

@Injectable()
export class InviteonlyService {
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

  getContent(body: any): Observable<Object> {
    return this.handlePostUrlWithoutHeader(
      `${this.targeturl}/${config.URLS.GET_CONTENT_DETAILS}`,
      body
    );
  }
  getbatchlist(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.GET_BATCH_LIST}`,
      body
    );
  }
  createBatch(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.CREATE_BATCH}`,
      body
    );
  }

  saveEnroluser(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.ENROL_USER}`,
      body
    );
  }

}