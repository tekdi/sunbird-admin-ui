import { Injectable } from '@angular/core';
import { SessionStorageKeys } from 'src/config/constant.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from 'src/config/url.config.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private targeturl: any;
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
    return this.http.post(url, data, { headers: headers });
  }
  userLogin(body: any): Observable<Object> {
    return this.handlePostUrl(
      `${this.targeturl}/${config.URLS.GENERATE_TOKEN}`,
      body
    );
  }
}
