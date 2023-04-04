import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCountComponent } from 'projects/sb-user-management/src/lib/user-count/user-count.component';
import { SbUserManagementComponent } from 'projects/sb-user-management/src/public-api';

const routes: Routes = [
  {path:'',component:SbUserManagementComponent},
  {path:'user-count-dashboard',component:UserCountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
