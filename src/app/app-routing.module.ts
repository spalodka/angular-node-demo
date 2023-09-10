import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RxjslearningComponent } from './rxjslearning/rxjslearning.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo : '/login'

  // },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component:SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rxjs',
    component: RxjslearningComponent
  },
  { path: 'users',
   loadChildren: () => import('./users/users.module').then(m => m.UsersModule) ,
     canLoad: [AuthGuard],
    canActivateChild:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
