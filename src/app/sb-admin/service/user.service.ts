import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../api/user';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUsersSmall() {
        return this.http.get<any>('assets/sb-admin/data/products-small.json')
            .toPromise()
            .then(res => res.data as User[])
            .then(data => data);
    }

    getUsers() {
        return this.http.get<any>('assets/sb-admin/data/response-users.json')
            .toPromise()
            .then(res => res.result.response.content)
            .then(data => data);
    }

    getUsersMixed() {
        return this.http.get<any>('assets/sb-admin/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as User[])
            .then(data => data);
    }

    getUsersWithOrdersSmall() {
        return this.http.get<any>('assets/sb-admin/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as User[])
            .then(data => data);
    }
}
