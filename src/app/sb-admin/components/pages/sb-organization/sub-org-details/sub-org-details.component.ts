import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationListService } from 'src/app/sb-admin/service/organization-list.service';
import { SubOrganizationDetail, SearchSubOrgFilterValue } from '../OrganizationDetail';
import { event } from 'jquery';

@Component({
  selector: 'app-sub-org-details',
  templateUrl: './sub-org-details.component.html',
  styleUrls: ['./sub-org-details.component.scss']
})
export class SubOrgDetailsComponent {

  rootOrg: any;
  data: any;
  subOrgDetails: SubOrganizationDetail[] = [];
  loading: boolean = true;
  first: number = 0;
  rows: number = 10;
  filteredValue = SearchSubOrgFilterValue;
  rowsPerPageOptions: number[] = [10, 20, 30];
  timeout: any = null;
  SuborgCount: number = 0;


  constructor(public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig, private organizationListService: OrganizationListService) {


  }

  ngOnInit() {
    this.data = this.dialogConfig.data;
    this.rootOrg = this.data.rootOrg;

    console.log('suborg', this.rootOrg.channel);
  }

  getSubOrgDetail(event: any) {
    this.filteredValue.channel = this.rootOrg.channel;

    console.log(this.filteredValue);
    let filtersValue = this.filteredValue;
    //let filtersValue = this.filteredValue;
    console.log('filter vluee', filtersValue);
    Object.keys(filtersValue).forEach(key => {
      if (!filtersValue[key]) {
        delete filtersValue[key]
      }
    });
    let offset = event.first
    offset = isNaN(offset) ? 0 : offset;
    console.log('before body', filtersValue);
    const body = {
      request: {
        filters: {
          ...this.filteredValue,
          isRootOrg: false,
          isTenant: false,
          // Include all properties from filteredValue
        },
        limit: event?.rows || 10,
        offset: offset,
      }
    }
    console.log(body);
    this.organizationListService.getAllOrgSubOrg(body).subscribe((suborg: any) => {
      this.SuborgCount = suborg.result.response.count;
      console.log(this.SuborgCount);
      this.subOrgDetails = suborg.result.response.content;

      console.log(this.subOrgDetails);

    })
  }

  onSearch(event: any): void {
    let $this = this;
    this.first = 0
    if (event.target.value.length > 3) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.getSubOrgDetail(event);
      }, 2000);
    }
    else if (event.target.value.length === 0) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $this.getSubOrgDetail(event);
      }, 1000);
    }
  }



}
