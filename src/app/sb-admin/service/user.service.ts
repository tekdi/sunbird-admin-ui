import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getOrganizations(payload: any): Observable<any> {
        let header = new HttpHeaders({
            "Content-Type": 'application/json',
            "Authorization": environment.authKey,
            "x-authenticated-user-token": environment.userToken,
        })
        return this.http.post(environment.orgUrl, payload, { headers: header });
    }

    getUserList(payload: any): Observable<any> {
        let header = new HttpHeaders({
            "Content-Type": 'application/json',
            "Authorization": environment.authKey,
            "x-authenticated-user-token": environment.userToken,
        })
        return this.http.post(environment.userUrl, payload, { headers: header });
    }

    addNewUser(payload: any): Observable<any> {
        let header = new HttpHeaders({
            "Content-Type": 'application/json',
            "Authorization": environment.authKey,
            "x-authenticated-user-token": environment.userToken,
        })
        return this.http.post(environment.userCreateUrl, payload, { headers: header });
    }
}
