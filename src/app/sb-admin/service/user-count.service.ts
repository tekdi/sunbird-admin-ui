import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import config from 'src/config/url.config.json';

@Injectable({
  providedIn: 'root'
})
export class UserCountService {

  constructor(private http: HttpClient) { }

  getTenant(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json'
    })
    return this.http.post(config.URLS.ORGNIZATION_SEARCH_URL, body, { headers: header })
  }

  getUserCountOfaTenant(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(config.URLS.USER_SEARCH_URL, body, { headers: header })
  }
}
