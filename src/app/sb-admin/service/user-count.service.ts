import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserCountService {

  constructor(private http: HttpClient) { }

  getTenant(): Observable<Object> {

    let header = new HttpHeaders({
      "Content-Type": 'application/json'
    })

    let body = {
      "request": {
        "filters": {
          "isRootOrg": true
        },
        "fields": [
          "id",
          "channel",
          "orgName",
          "externalId",
          "isRootOrg"
        ],
        "sortBy": {
          "createdDate": "Desc"
        },
        "limit": 1002
      }

    }
    return this.http.post('api/org/v1/search', body, { headers: header })
  }

  getUserCountOfaTenant(channelId: string): Observable<Object> {
    let header = new HttpHeaders({
      "Content-Type": 'application/json',
      "Authorization": environment.authKey,
      "x-authenticated-user-token": environment.userToken,
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
    return this.http.post('api/user/v1/search', body, { headers: header })
  }


}
