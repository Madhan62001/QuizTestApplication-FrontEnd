import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ConnectionsService } from './auth/connections.service';
import { TokenInterceptorService } from './auth/token/token-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SgquizComponent } from './components/sgquiz/sgquiz.component';
import { AiquizComponent } from './components/aiquiz/aiquiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ChangeBgDirective } from './change-bg.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SgquizComponent,
    AiquizComponent,
    HomeComponent,
    QuizComponent,
    ChangeBgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem('token')
      }
    }),
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  providers: [
    ConnectionsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
