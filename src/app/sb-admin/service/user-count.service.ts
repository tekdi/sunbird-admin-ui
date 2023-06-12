import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCountService {

  constructor(private http: HttpClient) { }

  getTenant(body: any): Observable<Object> {
    return this.http.post(environment.orgUrl, body)
  }

  getUserCountOfaTenant(body: any): Observable<Object> {
    return this.http.post(environment.userUrl, body)
  }
}
