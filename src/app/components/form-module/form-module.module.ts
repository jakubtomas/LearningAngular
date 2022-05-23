import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularComponent } from './formular/formular.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    FormularComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    //AppRoutingModule,
    BrowserAnimationsModule
  ]

})
export class FormModuleModule { }
