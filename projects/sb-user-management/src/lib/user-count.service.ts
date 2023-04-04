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
      "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXTFBhVTZTY0cyejFZMng4Y0FWNDJMVlRscUhMekV0YyJ9.7fhXiT3Mhbu7PT2PITYyF2tdW8ZowYJYnzpK5yGgHqc',
      "x-authenticated-user-token": 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTS1pUNEh5WWlaeHppTnJJZFVrSy1yaWY1QXJVYkVDODRsWGoyeVB3R2pJIn0.eyJqdGkiOiI3MDUxZmI2Yi1jNmQ1LTQzYzItODUxOS01MjliYzRhNjNhMWEiLCJleHAiOjE2ODA2MzE2NDMsIm5iZiI6MCwiaWF0IjoxNjgwNjEwMDQzLCJpc3MiOiJodHRwczovL3N1bmJpcmRzYWFzLmNvbS9hdXRoL3JlYWxtcy9zdW5iaXJkIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImY6ZTRmZDJjZjctMWIxOC00NWNmLWIwYjMtNTVjYzNlZGVhNTMzOjllZjY4ZDk1LTdkODAtNDBmYi1iNDc4LWQ1ZmY3OTQ2ODViOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImltcGxlbWVudGF0aW9uIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiZDQ4MWQyNWYtNzJhYy00OTgwLWIzYTEtODhjZmQ2ZmFjMjAwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3N1bmJpcmRzYWFzLmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY3JlYXRlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiU2hhc2hpa3VtYXIgUCBQIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGhmb19zaGFzaGlrdW1hciBwIiwiZ2l2ZW5fbmFtZSI6IlNoYXNoaWt1bWFyIFAiLCJmYW1pbHlfbmFtZSI6IlAiLCJlbWFpbCI6InNoKioqKioqKioqKioqKioqQGdtYWlsLmNvbSJ9.Y8C1vYa-TY9-6O76kC-jgM1VlqLr2-Gt4SwjNJozYp8EXc293GbCTkIbfbKbomNJhz7yRP3Ewh3943g-oHkXBi7SRcjkFhT3IVfCM_r5gWLbZFXibzpDyfpYf57jmtSm3oMdiRT3X8n6xIAcqmli8fK-ooUMQ_M36tpRGhZ2LgW9Psril5jVERI7Lr4aTlj7Q4uRtJIfLVEyalO68tVaeF08mr8ljLa63VWRxxSv9l73lxTiilU6djKhtOF9iu89zx-AJb1pzT2oIJGunh1OD-7_-Lo5-R2OaTkxf5--dCt4ShSEYoaoKAATDF2JJDjLcm1vmKYsPwKF9Ka2bVg2mA',
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
