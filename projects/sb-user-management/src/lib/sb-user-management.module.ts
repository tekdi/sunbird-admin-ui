import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SbUserManagementComponent } from './sb-user-management.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    SbUserManagementComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    InputTextModule
  ],
  exports: [
    SbUserManagementComponent
  ]
})
export class SbUserManagementModule { }
