import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbOrganizationRoutingModule } from './sb-organization-routing.module';
import { SbOrganizationComponent } from './sb-organization.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    SbOrganizationComponent
  ],
  imports: [
    CommonModule,
    SbOrganizationRoutingModule,
    TableModule
  ]
})
export class SbOrganizationModule { }
