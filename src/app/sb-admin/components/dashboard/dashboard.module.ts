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
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { I18NextModule, ITranslationService, I18NEXT_SERVICE, defaultInterpolationFormat } from 'angular-i18next';
import en from "src/locales/en/en.json";

export function appInit(i18next: ITranslationService) {
    let lang = localStorage.getItem('lang');
    const data = i18next.init({
        fallbackLng: lang ? lang : "en",
        debug: true,
        returnEmptyString: false,
        resources: {
            en: {
                translation: en
            }
        },
        ns: ['translation'],
        defaultNS: 'translation',
        interpolation: {
            format: I18NextModule.interpolationFormat(defaultInterpolationFormat),
        },
    });
    return () => data;
}
export function localeIdFactory(i18next: ITranslationService) {
    return i18next.language;
}
export const I18N_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInit,
        deps: [I18NEXT_SERVICE],
        multi: true
    },
    {
        provide: LOCALE_ID,
        deps: [I18NEXT_SERVICE],
        useFactory: localeIdFactory
    }];

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
        I18NextModule.forRoot(),
    ],
    providers: [
        I18N_PROVIDERS
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
