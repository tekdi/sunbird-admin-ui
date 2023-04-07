import { Component, OnInit } from '@angular/core';
import { UserCountService } from './user-count.service';
import tenantList from  './tenant.json';

interface TenantDetails {  
  tenantName: string;  
  tenantLogo: string;  
  userCount: Number;  
  channelId: string;  
}  

@Component({
  selector: 'lib-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.css']
})
export class UserCountComponent implements OnInit {

  constructor(private userCountService: UserCountService) { }

  tenantDetail: TenantDetails[]=tenantList;

  ngOnInit(): void {
    this.getTenantUserCount();
  }
  getTenantUserCount() {
    this.tenantDetail.map((tenant) => {
      this.userCountService.getUserCountOfaTenant(tenant.channelId).subscribe((counttenant:any)=> {
        //console.log(counttenant)
        //console.log(JSON.stringify(counttenant));
        tenant.userCount = counttenant?.result?.response?.count; 
      })
    })
    }

}






