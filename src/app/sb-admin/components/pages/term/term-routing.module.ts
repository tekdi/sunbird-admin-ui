import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TermComponent } from './term.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: TermComponent }
  ])],
  exports: [RouterModule]
})
export class TermRoutingModule { }
