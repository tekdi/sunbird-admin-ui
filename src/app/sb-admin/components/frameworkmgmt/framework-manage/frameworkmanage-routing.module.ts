import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameworkManageComponent } from './frameworkmanage.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: FrameworkManageComponent }
  ])],
  exports: [RouterModule]
})
export class FrameworkManageRoutingModule { }
