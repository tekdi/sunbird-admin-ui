import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbOrganizationRoutingModule } from './sb-organization-routing.module';
import { SbOrganizationComponent } from './sb-organization.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message";
import { I18NextModule} from 'angular-i18next';



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
    I18NextModule.forRoot()
  ]
})
export class SbOrganizationModule { }
