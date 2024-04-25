import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { EnroluserComponent } from './enroluser.component';
import { EnroluserRoutingModule } from './enroluser-routing.module';
import { InviteonlyService } from 'src/app/sb-admin/service/inviteonly.service';

@NgModule({
  declarations: [
    EnroluserComponent
  ],
  imports: [
    CommonModule,
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
    ChipModule,
    EnroluserRoutingModule,
    I18NextModule.forRoot()
  ],
  providers:[
   DialogService,
   DynamicDialogRef,
   MessageService,
   InviteonlyService
  ]
})
export class EnroluserModule { }
