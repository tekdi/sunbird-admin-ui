import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { I18NextModule } from 'angular-i18next';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
	DialogService,
	DynamicDialogModule,
	DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { TermAssociationComponent } from './term-association.component';
import { TermAssociationRoutingModule } from './term-association-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FrameworkService } from 'src/app/sb-admin/service/framework.service';
@NgModule({
	declarations: [TermAssociationComponent],
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
		TermAssociationRoutingModule,
		I18NextModule,
		NgMultiSelectDropDownModule,
	],
	providers: [DialogService, DynamicDialogRef, MessageService,FrameworkService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	
})
export class TermAssociationModule {}
