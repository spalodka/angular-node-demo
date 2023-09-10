import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  usersList :any = [];
  constructor(private httpClient:HttpClient,
              private router:Router){

  }
  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/getUsersList`).subscribe((res:any)=>{
       this.usersList = res.data;
    })
  }
  
  editUser(user:any){
    this.router.navigateByUrl("users/userAction");
  }

  deleteUser(user:any){
    this.router.navigateByUrl("users/userAction");
  }
}
