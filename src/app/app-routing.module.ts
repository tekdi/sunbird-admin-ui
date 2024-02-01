import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './sb-admin/components/login/login.component';
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
