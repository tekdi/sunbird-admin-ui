import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import config from 'src/config/url.config.json'

@Injectable({
  providedIn: 'root'
})
export class OrganizationListService {

  constructor(private http: HttpClient) { }

  getAllOrgSubOrg(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json'
    })
    return this.http.post(config.URLS.ORGNIZATION_SEARCH_URL, body, { headers: header })
  }

  addOrg(body: any): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(config.URLS.ORGANIZATION_CREATE_URL, body, { headers: header })
  }

  editOrg(body: any): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,

    })
    return this.http.patch(config.URLS.ORGANIZATION_UPDATE_URL, body, { headers: header })
  }

  addSubOrg(body: any): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })

    return this.http.post(config.URLS.ORGANIZATION_CREATE_URL, body, { headers: header })
  }

  getUserTypeCount(body: any): Observable<any> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
    return this.http.post(config.URLS.USER_TYPE_ROLE_COUNT, body, { headers: header })

  }

}
