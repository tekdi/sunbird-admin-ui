import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BatchupdateComponent } from './batchupdate.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: BatchupdateComponent }
  ])],
  exports: [RouterModule]
})
export class BatchupdateRoutingModule { }
