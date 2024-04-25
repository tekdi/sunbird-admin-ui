import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnroluserComponent } from './enroluser.component';
@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: EnroluserComponent }
  ])],
  exports: [RouterModule]
})
export class EnroluserRoutingModule { }
