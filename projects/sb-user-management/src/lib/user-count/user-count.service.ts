import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCountService {

  constructor(private http: HttpClient) { }

  //Get Count of Tenanat User
  getUserCountOfaTenant(channelId :string): Observable<Object> {
    let header = new HttpHeaders({  
      "Content-Type": 'application/json',
      "Authorization": '',
      "x-authenticated-user-token": '',
    })

    let body = {
      "request": {
          "filters": {
              "rootOrgId": channelId
          },
          "fields": [
              "firstName",
              "lastName",
              "userName",
              "id",
              "email",
              "phone",
              "createdDate",
              "roles",
              "managedBy"
          ],
          "limit": 10
      }
  }
    return this.http.post('api/user/v1/search',body,{headers : header}) 
  }
}
