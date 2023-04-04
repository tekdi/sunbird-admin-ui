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
      "x-authenticated-user-token": 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTS1pUNEh5WWlaeHppTnJJZFVrSy1yaWY1QXJVYkVDODRsWGoyeVB3R2pJIn0.eyJqdGkiOiJlNWM1Yjk1Mi05MDI1LTRmOGUtODc2Ni03MGYyMDliYTJlOGYiLCJleHAiOjE2ODA2Mjk0NzMsIm5iZiI6MCwiaWF0IjoxNjgwNjA3ODczLCJpc3MiOiJodHRwczovL3N1bmJpcmRzYWFzLmNvbS9hdXRoL3JlYWxtcy9zdW5iaXJkIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImY6ZTRmZDJjZjctMWIxOC00NWNmLWIwYjMtNTVjYzNlZGVhNTMzOjllZjY4ZDk1LTdkODAtNDBmYi1iNDc4LWQ1ZmY3OTQ2ODViOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImltcGxlbWVudGF0aW9uIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNzc0MTI0MDQtOGFjMi00ODU3LTgwYWQtNzNhYTM4ZTJiOTBiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3N1bmJpcmRzYWFzLmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY3JlYXRlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiU2hhc2hpa3VtYXIgUCBQIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGhmb19zaGFzaGlrdW1hciBwIiwiZ2l2ZW5fbmFtZSI6IlNoYXNoaWt1bWFyIFAiLCJmYW1pbHlfbmFtZSI6IlAiLCJlbWFpbCI6InNoKioqKioqKioqKioqKioqQGdtYWlsLmNvbSJ9.QPfn93MECBNslHI7ZQhGfH8g3tPgckqWLadU4yXwD0ltZXuEFCDa9e1LCVorUq2-2IYz3C6uzYJQMHWP4IsELklPe7XNpvMUabg253u-EE4qOoP4PNyaqUctRd0TBGpDz6isn0pHeUhd2bNCwHzPQr5jWWiQbc32KxfuI9zla7fSTAw64KZnlqCEGM3nsZqVrd1bcODfyoRylbhjtJ5e_OGJZDI9WP11i-Hzw0NLCAHzTnmCG6Nlak0PgkRk2QtKnRg3YlVlfteroazvp14f3-MiFN0DXP4VvBEapoz2oYOHuSTxE1D6ukiOTA9AtShbEfbWtq-imtjK0D12pADaoQ',
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
