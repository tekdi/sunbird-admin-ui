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

  getAllOrganizationList(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json'
    })
    return this.http.post(config.URLS.ORG_URL, body, { headers: header })
  }

  addOrg(body : any):Observable<any>{
    let header=new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
 return this.http.post(config.URLS.ADD_ORG_URL,body,{headers: header})
}
}
