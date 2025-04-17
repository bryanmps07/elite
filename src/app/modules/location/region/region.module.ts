import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import { RegionListComponent } from './pages/region-list/region-list.component';
import { RegionFormComponent } from './pages/region-form/region-form.component';
import { CoreUIComponentsModule } from '../../../shared/coreui-components.module';
import { PaginationModule } from '@coreui/angular';


@NgModule({
  declarations: [
    RegionListComponent,
    RegionFormComponent
  ],
  imports: [
    CommonModule,
    RegionRoutingModule,
    CoreUIComponentsModule,
    PaginationModule,

  ]
})
export class RegionModule { }
