import { Component } from '@angular/core';

@Component({
  selector: 'app-sb-organization',
  templateUrl: './sb-organization.component.html',
  styleUrls: ['./sb-organization.component.scss']
})
export class SbOrganizationComponent {

 organization =[
    {
      "organizationName": "Org1",
      "channel": "org1_channel",
      "isRootOrg": true,
      "id": 1234567890
    },
    {
      "organizationName": "Org2",
      "channel": "org2_channel",
      "isRootOrg": false,
      "id": 2345678901
    },
    {
      "organizationName": "Org3",
      "channel": "org3_channel",
      "isRootOrg": true,
      "id": 3456789012
    },
    {
      "organizationName": "Org4",
      "channel": "org4_channel",
      "isRootOrg": false,
      "id": 4567890123
    },
    {
      "organizationName": "Org5",
      "channel": "org5_channel",
      "isRootOrg": true,
      "id": 5678901234
    },
    {
      "organizationName": "Org6",
      "channel": "org6_channel",
      "isRootOrg": false,
      "id": 6789012345
    }]

}
