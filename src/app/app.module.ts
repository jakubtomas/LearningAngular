import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ItemState } from './state/item.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MaterialModule } from "../modules/material.module";
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/post/post.component';
import { PostState } from './state/post.state';
import { DemoChComponent } from './components/demo-ch/demo-ch.component';
import { DemoChildComponent } from './components/demo-ch/demo-child/demo-child.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { FruitComponent } from './components/fruits/fruit/fruit.component';
import { FormComponent } from './components/form/form.component';
import { FormularComponent } from './components/form-module/formular/formular.component';
import { FormModuleModule } from './components/form-module/form-module.module';
import { SmeFormComponent } from './components/sme-form/sme-form.component';
import { ImperativeComponent } from './components/imperative/imperative.component';
import { DeclarativeComponent } from './components/declarative/declarative.component';
import { StreamComponent } from './components/stream/stream.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { Form1Component } from './components/stepper/form1/form1.component';
import { Form2Component } from './components/stepper/form2/form2.component';
import { Form3Component } from './components/stepper/form3/form3.component';
import { HttpCallComponent } from './components/http-call/http-call.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ListComponent,
    PostComponent,
    DemoChComponent,
    DemoChildComponent,
    FruitsComponent,
    FruitComponent,
    FormComponent,
    SmeFormComponent,
    ImperativeComponent,
    DeclarativeComponent,
    StreamComponent,
    TemplateDrivenFormComponent,
    StepperComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    HttpCallComponent
    //FormModuleModule
    //FormularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([
      // ItemState,
      PostState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
