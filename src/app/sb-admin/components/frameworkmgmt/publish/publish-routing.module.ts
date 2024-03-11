import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublishComponent } from './publish.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: PublishComponent }
  ])],
  exports: [RouterModule]
})
export class PublishRoutingModule { }
