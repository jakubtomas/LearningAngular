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
    // FormModuleModule
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
export class AppModule {

}
