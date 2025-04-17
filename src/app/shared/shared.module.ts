import { NgModule } from '@angular/core';
import { CoreUIComponentsModule } from './coreui-components.module';
import { ToastsComponent } from './components/toasts/toasts.component';
import { DateFormatPipe } from './pipes/dateFormat.pipe';
import { SearchBoxComponent } from './components/searchBox/searchBox.component';
import { FormatDocumentPipe } from './pipes/format-document.pipe';
import { PhoneFormatPipe } from './pipes/phoneFormat.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CoreUIComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CoreUIComponentsModule,
    ToastsComponent,
    DateFormatPipe,
    FormatDocumentPipe,
    PhoneFormatPipe,
    SearchBoxComponent
  ],
  declarations: [
    ToastsComponent,
    DateFormatPipe,
    FormatDocumentPipe,
    PhoneFormatPipe,
    SearchBoxComponent
  ],
  providers: [],
})
export class SharedModule { }
