import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SbOrganizationComponent } from './sb-organization.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: SbOrganizationComponent }
	])],
  exports: [RouterModule]
})
export class SbOrganizationRoutingModule { }
