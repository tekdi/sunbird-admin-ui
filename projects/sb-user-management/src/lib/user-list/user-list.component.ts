import { Component, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CountService } from "../services/count.service";
import { UserService } from "../services/user-service/user.service";
@Component({
  selector: "lib-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  tableColumns: any[] = [];
  users: any;
  count: any;
  constructor(
    private uservice: CountService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.tableColumns = [
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      //{ field: 'role', header: 'Role' },
      { field: "email", header: "Email" },
      { field: "phone", header: "Phone" },
      { field: "status", header: "Status" },
      { field: "channel", header: "Channel" },
    ];

    this.userService.getUsersInOrganization("0124487522476933120").subscribe(
      (data) => {
        const resData: any = data;
        this.users = resData.result.response.content;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
