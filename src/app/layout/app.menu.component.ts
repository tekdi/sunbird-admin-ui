import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home'
            },
            {
                label: 'Org Management',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { 
                         label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']
                    },
                    {
                        label: 'Organizations',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/sb-organization']
                    },
                ]
            },
            {
                label: 'User Management',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/sb-user']
                    }
                ]
            }
        ];
    }
}
