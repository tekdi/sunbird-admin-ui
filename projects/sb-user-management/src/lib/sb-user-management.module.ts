import { NgModule } from '@angular/core';
import { SbUserManagementComponent } from './sb-user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { TabViewModule } from 'primeng/tabview';



@NgModule({
  declarations: [
    SbUserManagementComponent,
    UserListComponent
  ],
  imports: [
    TabViewModule
  ],
  exports: [
    SbUserManagementComponent
  ]
})
export class SbUserManagementModule { }
