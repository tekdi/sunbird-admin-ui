import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SbUserComponent } from './sbuser.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SbUserComponent }
	])],
	exports: [RouterModule]
})
export class SbUserRoutingModule { }
