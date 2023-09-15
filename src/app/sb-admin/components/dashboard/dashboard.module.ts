import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message";
import { I18NextModule } from 'angular-i18next';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubOrgDetailsComponent } from './sub-org-details/sub-org-details.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        InputTextModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        DynamicDialogModule,
        TabViewModule,
        DialogModule,
        KnobModule,
        I18NextModule.forRoot(),
    ],
    declarations: [DashboardComponent, SubOrgDetailsComponent],
    providers: [DialogService,
        DynamicDialogRef,
        MessageService]
})
export class DashboardModule { }
