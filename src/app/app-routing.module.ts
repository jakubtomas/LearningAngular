import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoChComponent } from './components/demo-ch/demo-ch.component';
import { FormularComponent } from './components/form-module/formular/formular.component';
import { RegistrationComponent } from './components/form-module/registration/registration.component';
import { FormComponent } from './components/form/form.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { PostComponent } from './components/post/post.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
