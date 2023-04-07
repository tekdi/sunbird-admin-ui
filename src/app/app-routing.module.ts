import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import { UserCountComponent } from 'projects/sb-user-management/src/lib/user-count/user-count.component';
import { SbUserManagementComponent } from 'projects/sb-user-management/src/public-api';

const routes: Routes = [
  {path:'',component:SbUserManagementComponent},
  {path:'user-count-dashboard',component:UserCountComponent}
];
=======
import { NotfoundComponent } from './sb-admin/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
>>>>>>> upstream/main

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./sb-admin/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'pages', loadChildren: () => import('./sb-admin/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
