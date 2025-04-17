import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipalityRoutingModule } from './municipality-routing.module';
import { MunicipalityListComponent } from './pages/municipality-list/municipality-list.component';
import { MunicipalityFormComponent } from './pages/municipality-form/municipality-form.component';
import { CoreUIComponentsModule } from '../../../shared/coreui-components.module';
import { PaginationModule } from '@coreui/angular';


@NgModule({
  declarations: [
    MunicipalityListComponent,
    MunicipalityFormComponent
  ],
  imports: [
    CommonModule,
    MunicipalityRoutingModule,
    CoreUIComponentsModule,
    PaginationModule,
  ]
})
export class MunicipalityModule { }
