import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbOrganizationRoutingModule } from './sb-organization-routing.module';
import { SbOrganizationComponent } from './sb-organization.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message";
import { I18NextModule} from 'angular-i18next';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    SbOrganizationComponent
  ],
  imports: [
    CommonModule,
    SbOrganizationRoutingModule,
    TableModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    I18NextModule.forRoot()
  ],
  providers:[
   DialogService
  ]
})
export class SbOrganizationModule { }
