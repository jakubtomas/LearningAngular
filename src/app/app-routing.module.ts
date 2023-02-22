import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeclarativeComponent } from './components/declarative/declarative.component';
import { DemoChComponent } from './components/demo-ch/demo-ch.component';
import { FarrayTwoComponent } from './components/form-module/farray-two/farray-two.component';
import { FormArrayComponent } from './components/form-module/form-array/form-array.component';
import { FormularComponent } from './components/form-module/formular/formular.component';
import { RegistrationComponent } from './components/form-module/registration/registration.component';
import { FormComponent } from './components/form/form.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { ImperativeComponent } from './components/imperative/imperative.component';
import { PostComponent } from './components/post/post.component';
import { SmeFormComponent } from './components/sme-form/sme-form.component';
import { StreamComponent } from './components/stream/stream.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'post', component: PostComponent },
  { path: 'demo', component: DemoChComponent },
  { path: 'fruits', component: FruitsComponent },
  { path: 'form', component: FormComponent },

  { path: 'formular', component: FormularComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'formArray', component: FormArrayComponent },
  { path: 'formArrayTwo', component: FarrayTwoComponent },

  { path: 'smeComponent', component: SmeFormComponent },

  { path: 'imperative', component: ImperativeComponent },
  { path: 'declarative', component: DeclarativeComponent },
  { path: 'stream', component: StreamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
