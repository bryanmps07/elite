import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { CoreUIComponentsModule } from '../../../shared/coreui-components.module';

import { UsersFormComponent } from './pages/users-form/users-form.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { FormModule, PaginationModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../../../shared/shared.module';
import { IconModule, IconSetModule } from '@coreui/icons-angular';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreUIComponentsModule,
    PaginationModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    SharedModule,
    IconModule,
    IconSetModule,
  ],
  exports: [],
  declarations: [
    UsersFormComponent,
    UsersListComponent
  ],
  providers: [],
})
export class UsersModule { }
