import { Injectable } from '@angular/core';
import { SessionStorageKeys } from 'src/config/constant.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from 'src/config/url.config.json';
import { Observable } from 'rxjs';
// import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private targeturl: any;
  decodedToken: any;
  constructor(
    private http: HttpClient,
  ) {
    this.targeturl = this.getTargetUrl();
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

  // Example methods using the configuration object
  setAccessToken(token: string): void {
    this.setItem(SessionStorageKeys.ACCESS_TOKEN, token);
    
  }

  decodeToken(token: string): any {
    const helper = new JwtHelperService();
    const decoded= helper.decodeToken(token);
    return decoded
  }
  

  getAccessToken(): string | null {
    return this.getItem(SessionStorageKeys.ACCESS_TOKEN);
  }

  setAuthToken(token: string): void {
    this.setItem(SessionStorageKeys.AUTH_TOKEN, token);
  }

  getAuthToken(): string | null {
    return this.getItem(SessionStorageKeys.AUTH_TOKEN);
  }

  setTargetUrl(url: string): void {
    this.setItem(SessionStorageKeys.TARGET_URL, url);
  }

  getTargetUrl(): string | null {
    return this.getItem(SessionStorageKeys.TARGET_URL);
  }

  private getCommonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  private handlePostUrl(url: string, data: any): Observable<any> {
    const headers = this.getCommonHeaders();
    const encodedData = this.encodeFormData(data);
    return this.http.post(url, encodedData, { headers: headers });
  }

  private encodeFormData(data: any): string {
    const params = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params.set(key, data[key]);
      }
    }
    return params.toString();
  }
  
  userLogin(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.getTargetUrl()}/${config.URLS.GENERATE_TOKEN}`,
      body
    );
  }
}
