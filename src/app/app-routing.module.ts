import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SgquizComponent } from './components/sgquiz/sgquiz.component';
import { AiquizComponent } from './components/aiquiz/aiquiz.component';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  { path:"register",component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:".",component:AppComponent},
  {path:"sgquiz",component:SgquizComponent},
  {path:"aiquiz",component:AiquizComponent},
  {path:"home",component:HomeComponent},
  {path:"quiz",component:QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
