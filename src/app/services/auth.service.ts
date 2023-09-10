import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isUserLoggedIn$ =new  BehaviorSubject<boolean>(false);
  isAuthenticatedUser:boolean = false;

// public get users(){
//   return this.userDetails;
//  }
// public  set users(user:any){
//     this.userDetails = user;
//   }

  isAuthorized() {
    this.isAuthenticatedUser = !!(localStorage.getItem("access_token"));
    alert(this.isAuthenticatedUser);
    return this.isAuthenticatedUser;
}

// setAuthorizationStatus(isAuthenticatedUser:boolean){
//   this.isAuthenticatedUser = isAuthenticatedUser;
// }

  get isLoggedIn(){
    return this.isUserLoggedIn$.asObservable(); 
  }

 public setLoggedIn(){
  this.isUserLoggedIn$.next(true);
  localStorage.setItem("loggedInStatus","true");
  }

  public userLogOut(){
    this.isUserLoggedIn$.next(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("loggedInStatus");
  }

}
