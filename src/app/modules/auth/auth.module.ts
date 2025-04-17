import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AlertModule, ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    AlertModule
  ]
})
export class AuthModule { }
