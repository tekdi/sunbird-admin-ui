import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
      { path: 'framework', loadChildren: () => import('./framework/framework.module').then(m => m.FrameworkModule) },
        { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
        { path: 'frameworkmanage', loadChildren: () => import('./framework-manage/frameworkmanage.module').then(m => m.FrameworkManageModule) },
        { path: 'term', loadChildren: () => import('./term/term.module').then(m => m.TermModule) },
        { path: 'term-association', loadChildren: () => import('./term-association/term-association.module').then(m => m.TermAssociationModule) },
        { path: 'publish', loadChildren: () => import('./publish/publish.module').then(m => m.PublishModule) },
    ])],
    exports: [RouterModule]
})
export class  FrameworkManageRoutingModule { }
