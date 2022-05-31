import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularComponent } from './formular/formular.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { FarrayTwoComponent } from './farray-two/farray-two.component';



@NgModule({
  declarations: [
    FormularComponent,
    RegistrationComponent,
    FormArrayComponent,
    FarrayTwoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
    //AppRoutingModule,
  ]

})
export class FormModuleModule { }
