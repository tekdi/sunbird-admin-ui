import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'sb-user', loadChildren: () => import('./sb-user/sbuser.module').then(m => m.SbUserModule) },
        { path: 'sb-organization', loadChildren: () => import('./sb-organization/sb-organization.module').then(m => m.SbOrganizationModule) },
        { path: 'user-dashboard', loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule) },
        { path: 'framework', loadChildren: () => import('./framework/framework.module').then(m => m.FrameworkModule) },
        { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
        { path: 'frameworkmanage', loadChildren: () => import('./framework-manage/frameworkmanage.module').then(m => m.FrameworkManageModule) },
        { path: 'term', loadChildren: () => import('./term/term.module').then(m => m.TermModule) },
        { path: 'publish', loadChildren: () => import('./publish/publish.module').then(m => m.PublishModule) },

        { path: '**', redirectTo: '/notfound' },




    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
