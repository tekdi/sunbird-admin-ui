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

        this.items = [
            { label: 'Educate Girls', icon: 'bg-blue-100' },
            { label: 'Dhwani', icon: 'bg-green-100' },
            { label: 'ALT', icon: 'bg-cyan-100' },
            { label: 'Pratham', icon: 'bg-purple-100' },
            { label: 'KEF', icon: 'bg-blue-100' },
            { label: 'BJS', icon: 'bg-green-100' },
            { label: 'Tan90', icon: 'bg-cyan-100' }
        ];
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
