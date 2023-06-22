import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'sb-user', loadChildren: () => import('./sb-user/sbuser.module').then(m => m.SbUserModule) },
        { path: 'sb-organization', loadChildren: () => import('./sb-organization/sb-organization.module').then(m => m.SbOrganizationModule) },
        { path: 'sb-dashboard', loadChildren: () => import('./sb-dashboard/sb-dashboard.module').then(m => m.SbDashboardModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
