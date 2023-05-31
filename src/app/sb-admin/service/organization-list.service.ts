import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationListService {

  constructor(private http: HttpClient) { }

  getAllOrganizationList(body: any): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json'
    })
    return this.http.post(environment.orgUrl, body, { headers: header })
  }

  addOrg(body : any):Observable<any>{
    let header=new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
    })
 return this.http.post(environment.addOrgUrl,body,{headers: header})
}
}
