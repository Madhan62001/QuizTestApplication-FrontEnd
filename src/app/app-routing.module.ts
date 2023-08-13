import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SgquizComponent } from './components/sgquiz/sgquiz.component';
import { AiquizComponent } from './components/aiquiz/aiquiz.component';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DsboardComponent } from './components/dsboard/dsboard.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"",component:HomeComponent},
  {path:"sgquiz",component:SgquizComponent},
  {path:"aiquiz",component:AiquizComponent},
  {path:"quiz",component:QuizComponent},
  {path:"profile",component:ProfileComponent},
  {path:"board",component:DsboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
