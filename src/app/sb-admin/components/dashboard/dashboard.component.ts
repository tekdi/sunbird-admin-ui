import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../../api/user';
import { UserService } from '../../service/user.service';
import { map, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserCountService } from '../../service/user-count.service';


interface TenantDetails {
    orgName: string;
    userCount: Number;
    id: string;
}

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    users!: User[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    tenantDetail: TenantDetails[] = [];

    cols: any[] = [];

    loading: boolean = true;

    constructor(private userService: UserService, public layoutService: LayoutService, private userCountService: UserCountService) {

    }

    ngOnInit() {

        this.cols = [
            { field: 'orgName', header: 'Organization Name' },
            { field: 'userCount', header: 'User Registered' }
        ];

        this.getTenant().subscribe((data: any) => {
            if (data) {

                this.getTenantUsercount(data);
            }
        });

        this.userService.getUsers().then(data => this.users = data);
    }

    //Get all tenant data
    getTenant() {
        return this.userCountService.getTenant().pipe(
            map((data: any) => {
                this.tenantDetail = data.result.response.content;
                return this.tenantDetail;
            })
        );
    }

    //Get user count of each tenant 
    getTenantUsercount(tenantDetail: any): void {
        tenantDetail.map((tenant: any) => {
            this.userCountService.getUserCountOfaTenant(tenant.id).subscribe((counttenant: any) => {
                tenant.userCount = counttenant?.result?.response?.count;
                if (tenantDetail[tenantDetail.length - 1].id === tenant.id) {
                    this.loading = false;
                }
            });
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
