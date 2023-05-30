import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './sb-admin/components/notfound/notfound.component';
import { UserService } from './sb-admin/service/user.service';
import { UserCountService } from './sb-admin/service/user-count.service';
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { I18NextModule, ITranslationService, I18NEXT_SERVICE, defaultInterpolationFormat } from 'angular-i18next';
import en from "../locales/en/en.json";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

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
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        I18NextModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ToastModule    
    ],
    providers: [
        UserService,
        UserCountService,
        I18N_PROVIDERS
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
