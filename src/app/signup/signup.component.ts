import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
   constructor(private fb:FormBuilder , private activateRoute:ActivatedRoute){

   }
   signupForm = this.fb.group({
    firstname:['',Validators.required],
    // lastname : '',
    // username:'',
    // password:''
   })
   ngOnInit(): void {
   const value = this.activateRoute.snapshot.queryParamMap.get('newOrdNum');
   console.log('this.activateRoute is :: ',this.activateRoute);
   this.activateRoute.queryParams.subscribe((res)=>{
    console.log('value is activated route observable is :: ',res);
   })
   console.log('value is :: ',value);
   }
}
