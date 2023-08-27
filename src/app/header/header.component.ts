import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit{

  constructor(public authService : AuthService,
              private router : Router){

  }
  ngOnInit(): void {
   // this.isLoggedIn$ = this.authService.isLoggedIn;;
  }
  logout(){
    this.authService.userLogOut();
    this.router.navigateByUrl("/login")
  }
}
