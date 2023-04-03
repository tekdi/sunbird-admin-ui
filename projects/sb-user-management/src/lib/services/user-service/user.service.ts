import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./data";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsersInOrganization(channelId: string) {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: environment.authkey,
      "x-authenticated-user-token": environment.usertoken,
    });

    let body = {
      request: {
        filters: {
          rootOrgId: channelId,
        },
        fields: [
          "firstName",
          "lastName",
          "userName",
          "id",
          "email",
          "phone",
          "createdDate",
          "roles",
          "managedBy",
          "status",
          "channel",
        ],
        limit: 50,
      },
    };

    return this.http.post("api/user/v1/search", body, { headers: header });
  }
}
