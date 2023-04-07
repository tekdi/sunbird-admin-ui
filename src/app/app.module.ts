import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SbUserManagementModule } from 'projects/sb-user-management/src/lib/sb-user-management.module';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SbUserManagementModule,
    DataViewModule,
    TableModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
=======
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './sb-admin/components/notfound/notfound.component';
import { UserService } from './sb-admin/service/user.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
>>>>>>> upstream/main
})
export class AppModule { }
