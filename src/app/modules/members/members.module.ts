import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { MemberFormComponent } from './pages/member-form/member-form.component';
import { CoreUIComponentsModule } from '../../shared/coreui-components.module';
import { FormModule, PaginationModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { IconModule, IconSetModule } from '@coreui/icons-angular';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberFormComponent,
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    CoreUIComponentsModule,
    PaginationModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
    SharedModule,
    IconModule,
    IconSetModule,
  ]
})
export class MembersModule { }
