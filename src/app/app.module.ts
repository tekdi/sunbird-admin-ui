import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from "primeng/tabview";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { SbUserManagementModule } from "projects/sb-user-management/src/lib/sb-user-management.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    SbUserManagementModule,
    TabViewModule,
    TableModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
