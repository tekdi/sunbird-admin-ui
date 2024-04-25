import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { SbUserComponent } from './sbuser.component';
import { SbUserRoutingModule } from './sbuser-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PasswordModule } from "primeng/password";
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { I18NextModule } from 'angular-i18next';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message";
import { ChipModule } from 'primeng/chip';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        SbUserRoutingModule,
        MultiSelectModule,
        DynamicDialogModule,
        PasswordModule,
        FormsModule,
        ReactiveFormsModule,
        PaginatorModule,
        CheckboxModule,
        MessagesModule,
        MessageModule,
        ChipModule,
        I18NextModule.forRoot(),
        HttpClientModule
    ],
    declarations: [SbUserComponent, AddEditUserComponent],
    providers: [DialogService,
        MessageService
    ]
})
export class SbUserModule { }
