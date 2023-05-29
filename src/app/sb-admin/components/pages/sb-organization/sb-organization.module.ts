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
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AddOrEditOrgComponent } from './add-or-edit-org/add-or-edit-org.component';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    SbOrganizationComponent,
    AddOrEditOrgComponent

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
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    InputTextareaModule,
    DropdownModule,
    I18NextModule.forRoot()
  ],
  providers:[
   DialogService,
   DynamicDialogRef,
   MessageService
  ]
})
export class SbOrganizationModule { }
