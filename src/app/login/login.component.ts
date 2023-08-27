import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private httpClient:HttpClient,
             public router:Router,
             public authService:AuthService){
  }
  usersList : any;
  isAuthenticatedUser :boolean =false;
  isSubmitted:boolean=false;
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {
    // this.httpClient.get("/assets/userslist.json").subscribe((res:any)=>{
    //   this.usersList = res;
    //})
  }

  onSubmit(userDetails:any){
    console.log("userDetailsis::",userDetails);
   // let selectedUser = "";
    // for (let i = 0; i < this.usersList.length; i++) {
    //   const userName = this.usersList[i].username;
    //   const password = this.usersList[i].password;
    //   if(userName === userDetails.value.userName && password === userDetails.value.password){
    //       this.authService.users(this.usersList[i]);
    //      //selectedUser = userName;
    //      isAuthenticatedUser=true;
    //      break;
    //   }   
    // }

   this.httpClient
      .post(`${environment.apiUrl}/validateUserDetails`, userDetails.value)
     .subscribe((response:any) => {
       console.log('api response is :: ', response);
       this.isSubmitted = true;
       if(response['status'] == 'success' || response['status'] == 'fail' ){
          this.isAuthenticatedUser = response.data.isAuthenticatedUser;
          if(response['status'] == 'success'){
            localStorage.setItem("access_token",response.data.authToken);
           this.authService.setLoggedIn();
         //  this.router.navigate(['/home']);
         this.router.navigateByUrl("users");
          }
      }
     });
  }
  getAllPost(){
    this.httpClient.get("https://jsonplaceholder.typicode.com/posts").subscribe((res:any)=>{
      console.log(' post response is :: ',res);
    })
  }

}
