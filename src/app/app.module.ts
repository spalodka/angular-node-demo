import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RxjslearningComponent } from './rxjslearning/rxjslearning.component';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { StaffComponent } from './staff/staff.component';
import { FeestructureComponent } from './feestructure/feestructure.component';
import { UserroleDirective } from './directives/userrole.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RxjslearningComponent,
    HeaderComponent,
    FooterComponent,
    StudentComponent,
    CourseComponent,
    StaffComponent,
    FeestructureComponent,
    UserroleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
