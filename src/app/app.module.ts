import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SbUserManagementModule } from 'projects/sb-user-management/src/lib/sb-user-management.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SbUserManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
