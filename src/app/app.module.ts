import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './sb-admin/components/notfound/notfound.component';
import { UserService } from './sb-admin/service/user.service';
import { UserCountService } from './sb-admin/service/user-count.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        UserService,
        UserCountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
