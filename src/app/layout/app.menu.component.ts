import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { I18NextPipe } from 'angular-i18next';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService,
        private i18nextPipe: I18NextPipe,) { }

    ngOnInit() {
        this.model = [
            {
                label: this.i18nextPipe.transform('ORG'),
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: this.i18nextPipe.transform('ORG_DASHBOARD'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard']
                    },
                    {
                        label: this.i18nextPipe.transform('ORG_MANAGEMENT'),
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/sb-organization']
                    },
                ]
            },
            {
                label: this.i18nextPipe.transform('COMMON_USERS'),
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: this.i18nextPipe.transform('USER_DASHBOARD'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/user-dashboard']
                    },
                    {
                        label: this.i18nextPipe.transform('USER_MANAGEMENT'),
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/sb-user']
                    }
                ]
            },
            {
                label: this.i18nextPipe.transform('FRAMEWORK'),
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: this.i18nextPipe.transform('FRAMEWORK'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/framework']
                    },
                    {
                        label: this.i18nextPipe.transform('FRAMEWORK_MANAGEMENT'),
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/frameworkmanage']
                    },
                    {
                        label: this.i18nextPipe.transform('CATEGORY'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/category']
                    },
                    {
                        label: this.i18nextPipe.transform('TERM'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/term']
                    },
                    {
                        label: this.i18nextPipe.transform('PUBLISH'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/publish']
                    }
                    
                ]
            },
        ];
    }
}
