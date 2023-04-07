import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../../api/user';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    users!: User[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(private userService: UserService, public layoutService: LayoutService) {
    }

    ngOnInit() {
        this.userService.getUsers().then(data => this.users = data);

        //TODO:- Need to replace this with actual org data and map it
        this.items = [
            { label: 'ORG_1', icon: 'bg-blue-100' },
            { label: 'ORG_2', icon: 'bg-green-100' },
            { label: 'ORG_3', icon: 'bg-cyan-100' },
            { label: 'ORG_4', icon: 'bg-purple-100' },
            { label: 'ORG_5', icon: 'bg-blue-100' },
            { label: 'ORG_6', icon: 'bg-green-100' },
            { label: 'ORG_7', icon: 'bg-cyan-100' }
        ];
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
