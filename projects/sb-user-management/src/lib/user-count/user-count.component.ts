import { Component, OnInit } from '@angular/core';
import { UserCountService } from './user-count.service';
import tenantList from  './tenantDetails.json';

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
      this.userCountService.getUserCountOfaTenant(tenant.channelId).subscribe((counttenant)=> {
        const data : any= counttenant;
         tenant.userCount = data?.result?.response?.count; 
      })
    })
    }
}






