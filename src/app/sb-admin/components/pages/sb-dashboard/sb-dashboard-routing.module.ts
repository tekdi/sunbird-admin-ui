import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SbDashboardComponent } from './sb-dashboard.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: SbDashboardComponent }
  ])],
  exports: [RouterModule]
})
export class SbDashboardRoutingModule { }
