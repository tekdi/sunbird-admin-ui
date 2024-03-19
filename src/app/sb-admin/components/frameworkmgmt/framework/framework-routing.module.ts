import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './framework.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: FrameworkComponent }
  ])],
  exports: [RouterModule]
})
export class FrameworkRoutingModule { }
