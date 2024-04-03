import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TermAssociationComponent } from './term-association.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: TermAssociationComponent }
  ])],
  exports: [RouterModule]
})
export class TermAssociationRoutingModule { }
