import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isUserLoggedIn$ =new  BehaviorSubject<boolean>(false);
  public userDetails :any ;

public get users(){
  return this.userDetails;
 }
public  set users(user:any){
    this.userDetails = user;
  }

  isAuthorized() {
    return !!this.userDetails;
}

  hasRole(role: Role) {
    return this.isAuthorized() && this.userDetails.role === role;
}

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
