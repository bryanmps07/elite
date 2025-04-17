import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvincesRoutingModule } from './provinces-routing.module';
import { ProvinceListComponent } from './pages/province-list/province-list.component';
import { ProvinceFormComponent } from './pages/province-form/province-form.component';
import { CoreUIComponentsModule } from '../../../shared/coreui-components.module';
import { PaginationModule } from '@coreui/angular';


@NgModule({
  declarations: [
    ProvinceListComponent,
    ProvinceFormComponent
  ],
  imports: [
    CommonModule,
    ProvincesRoutingModule,
    CoreUIComponentsModule,
    PaginationModule,
  ]
})
export class ProvincesModule { }
