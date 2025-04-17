import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneListComponent } from './pages/zone-list/zone-list.component';
import { ZoneFormComponent } from './pages/zone-form/zone-form.component';
import { CoreUIComponentsModule } from '../../../shared/coreui-components.module';
import { PaginationModule } from '@coreui/angular';


@NgModule({
  declarations: [
    ZoneListComponent,
    ZoneFormComponent
  ],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    CoreUIComponentsModule,
    PaginationModule,
  ]
})
export class ZoneModule { }
