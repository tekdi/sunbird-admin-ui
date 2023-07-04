import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: UserDashboardComponent }
  ])],
  exports: [RouterModule]
})
export class SbDashboardRoutingModule { }
