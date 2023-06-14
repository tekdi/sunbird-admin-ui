import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './sb-admin/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './sb-admin/components/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./sb-admin/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuard] },
                    { path: 'pages', loadChildren: () => import('./sb-admin/components/pages/pages.module').then(m => m.PagesModule), canActivate:[AuthGuard] }
                ]
            },
            { path: 'login', pathMatch: 'full', loadChildren: () => import('./sb-admin/components/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
