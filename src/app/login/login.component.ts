import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  constructor(private httpClient:HttpClient,
             public router:Router,
             public authService:AuthService,
             public _route:ActivatedRoute){
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
      .post(`${environment.apiUrl}/validateUserDetails`, userDetails.value).pipe(
        catchError((error:any) =>{
          console.log('error caught ....',error);
            return of([]);
        })
      )
     .subscribe((response:any) => {
       console.log('api response is :: ', response);
       this.isSubmitted = true;
       if(response['status'] == 'success' || response['status'] == 'fail' ){
          this.isAuthenticatedUser = response.data.isAuthenticatedUser;
          this.authService.isAuthenticatedUser = this.isAuthenticatedUser;
          if(response['status'] == 'success'){
            localStorage.setItem("access_token",response.data.authToken);
           this.authService.setLoggedIn();
         //  this.router.navigate(['/home']);
         this.router.navigateByUrl("users");
          }
      }
     }
     );
  }
  getAllPost(){
    this.httpClient.get("https://jsonplaceholder.typicode.com/posts").subscribe((res:any)=>{
      console.log(' post response is :: ',res);
    })
  }

  redirectTo(){
    this.router.navigate(['/signup'],{
   relativeTo: this._route,
    queryParams: {
      newOrdNum: '123'
    },
    queryParamsHandling: 'merge',
    // preserve the existing query params in the route
     skipLocationChange: false
    // do not trigger navigation
  });
  }

}
