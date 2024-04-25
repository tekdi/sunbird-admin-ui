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
    isAdmin!:any
    isCreator!:any;

    constructor(public layoutService: LayoutService,
        private i18nextPipe: I18NextPipe,) { }

        ngOnInit() {
            this.isAdmin = sessionStorage.getItem("isAdmin") === "true";
            this.isCreator = sessionStorage.getItem("isCreator") === "true";
        
            // Initialize an empty array to hold the menu items
            this.model = [];
        
            // If isAdmin is true, add ORG, COMMON_USERS, and FRAMEWORK menu items
            if (this.isAdmin) {
                this.model.push({
                    label: this.i18nextPipe.transform('ORG'),
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: this.i18nextPipe.transform('ORG_DASHBOARD'),
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/dashboard']

                        },
                        //  {
                        //   label: this.i18nextPipe.transform('ORG_MANAGEMENT'),
                        //                 icon: 'pi pi-fw pi-user',
                        //                 routerLink: ['/pages/sb-organization']
                        //             },
                        // Add more ORG menu items here if needed
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
                        // Add more COMMON_USERS menu items here if needed
                    ]
                },
                {
                    label: this.i18nextPipe.transform('FRAMEWORK'),
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: this.i18nextPipe.transform('FRAMEWORK'),
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/framework-management/framework']
                            
                        },
                         // {
                            //     label: this.i18nextPipe.transform('FRAMEWORK_MANAGEMENT'),
                            //     icon: 'pi pi-fw pi-user',
                            //     routerLink: ['/framework-management/framework-manage']
                            // },
                                    // Add more FRAMEWORK menu items here if needed
                                    {
                                        label: this.i18nextPipe.transform('CATEGORY'),
                                        icon: 'pi pi-fw pi-home',
                                        routerLink: ['/framework-management/category']
                                    },
                                    {
                                        label: this.i18nextPipe.transform('TERM'),
                                        icon: 'pi pi-fw pi-home',
                                        routerLink: ['/framework-management/term']
                                    },
                                    {
                                        label: this.i18nextPipe.transform('TERM_ASSOCIATION'),
                                        icon: 'pi pi-fw pi-home',
                                        routerLink: ['/framework-management/term-association']
                                    },
                                    {
                                        label: this.i18nextPipe.transform('PUBLISH'),
                                        icon: 'pi pi-fw pi-home',
                                        routerLink: ['/framework-management/publish']
                                    }
                    ]
                });
            }
        
            // If isCreator is true, add INVITE_ONLY menu items
            if (this.isCreator) {
                this.model.push({
                    label: this.i18nextPipe.transform('INVITE_ONLY'),
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: this.i18nextPipe.transform('INVITE_ONLY_DASHBOARD'),
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/inviteonly/batchupdate']
                        },
                        {
                            label: this.i18nextPipe.transform('INVITE_ONLY_ENROLL'),
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/inviteonly/enroluser']
                        }
                        // Add more INVITE_ONLY menu items here if needed
                    ]
                });
            }
        }
        
        
}
