import { NgModule } from '@angular/core';
import { SbUserManagementComponent } from './sb-user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { TabViewModule } from 'primeng/tabview';
import { UserCountComponent } from './user-count/user-count.component';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    SbUserManagementComponent,
    UserListComponent,
    UserCountComponent
  ],
  imports: [
    TabViewModule,
    DataViewModule,
    TableModule 
  ],
  exports: [
    SbUserManagementComponent
  ]
})
export class SbUserManagementModule { }
