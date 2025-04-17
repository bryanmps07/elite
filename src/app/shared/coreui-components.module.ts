import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardModule,
  ButtonModule,
  DropdownModule,
  GridModule,
  ButtonGroupModule,
  ProgressModule,
  AvatarModule,
  TableModule,
  UtilitiesModule,
  FormModule,
  ToastModule,
} from '@coreui/angular';

import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';


@NgModule({
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    ButtonModule,
    DropdownModule,
    ButtonGroupModule,
    ChartjsModule,
    ProgressModule,
    AvatarModule,
    TableModule,
    UtilitiesModule,
    IconModule,
    FormModule,
    ToastModule
  ],
  exports: [
    CardModule,
    GridModule,
    ButtonModule,
    DropdownModule,
    ButtonGroupModule,
    ChartjsModule,
    ProgressModule,
    AvatarModule,
    TableModule,
    UtilitiesModule,
    IconModule,
    FormModule,
    ToastModule
  ]
})
export class CoreUIComponentsModule {}
