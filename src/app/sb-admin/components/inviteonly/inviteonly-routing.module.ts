import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'batchupdate', loadChildren: () => import('./batchupdate/batchupdate.module').then(m => m.BatchupdateModule) },
        { path: 'enroluser', loadChildren: () => import('./enroluser/enroluser.module').then(m => m.EnroluserModule) },
    ])],
    exports: [RouterModule]
})
export class  InviteonlyRoutingModule { }
