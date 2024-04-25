import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './sb-admin/components/login/login.component';
import { FrameworkManageRoutingModule } from './sb-admin/components/frameworkmgmt/frameworkmgmt-routing.module';
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LoginComponent,
          children: [
            {
              path: '',
              loadChildren: () =>
                import('./sb-admin/components/login/login.module').then(
                  (m) => m.LoginModule
                ),
            },
          ],
        },
        {
          path: 'dashboard',
          component: AppLayoutComponent,
          children: [
            {
              path: '',
              loadChildren: () =>
                import(
                  './sb-admin/components/dashboard/dashboard.module'
                ).then((m) => m.DashboardModule),
            },
          ],
        },
        {
          path: 'pages',
          component: AppLayoutComponent,
          children: [
            {
              path: 'pages',
              loadChildren: () =>
                import('./sb-admin/components/pages/pages.module').then(
                  (m) => m.PagesModule
                ),
            },
          ],
        },
        {
          path: 'pages',
          component: AppLayoutComponent,
          loadChildren: () =>
            import('./sb-admin/components/pages/pages.module').then(
              (m) => m.PagesModule
            ),
        },
        {
          path: 'framework-management',
          component: AppLayoutComponent,
          children: [
            { path: 'category', loadChildren: () => import('./sb-admin/components/frameworkmgmt/category/category.module').then(m => m.CategoryModule) },
            { path: 'framework-manage', loadChildren: () => import('./sb-admin/components/frameworkmgmt/framework-manage/frameworkmanage.module').then(m => m.FrameworkManageModule) },
            { path: 'framework', loadChildren: () => import('./sb-admin/components/frameworkmgmt/framework/framework.module').then(m => m.FrameworkModule) },
            { path: 'publish', loadChildren: () => import('./sb-admin/components/frameworkmgmt/publish/publish.module').then(m => m.PublishModule)},
            { path: 'term', loadChildren: () => import('./sb-admin/components/frameworkmgmt/term/term.module').then(m => m.TermModule)  },
            { path: 'term-association', loadChildren: () => import('./sb-admin/components/frameworkmgmt/term-association/term-association.module').then(m => m.TermAssociationModule) },
            { path: '', redirectTo: 'category', pathMatch: 'full' }, // Default to category if no child route provided
          ],
        },
        {
          path: 'inviteonly',
          component: AppLayoutComponent,
          children: [
            { path: 'batchupdate', loadChildren: () => import('./sb-admin/components/inviteonly/batchupdate/batchupdate.module').then(m => m.BatchupdateModule) },
            { path: 'enroluser', loadChildren: () => import('./sb-admin/components/inviteonly/enroluser/enroluser.module').then(m => m.EnroluserModule) },

            { path: '', redirectTo: 'category', pathMatch: 'full' }, // Default to category if no child route provided
          ],
        },

        { path: '**', redirectTo: '/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule {}
