import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, FormModule } from '@coreui/angular';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CoreUIComponentsModule } from '../../shared/coreui-components.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormModule,
    ReactiveFormsModule,
    CardModule,
    CoreUIComponentsModule,


  ]
})
export class DashboardModule { }
