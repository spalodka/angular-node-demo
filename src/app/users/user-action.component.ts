import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit{
  constructor(private fb : FormBuilder ,
             public router :Router){
              console.log('current navigation is :: ',this.router.getCurrentNavigation());
              this.selectedUserDetails =this.router.getCurrentNavigation()?.extras?.state?.['selectedUserDetails'];

  }
  userForm!:FormGroup;
  selectedUserDetails : any = {};
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      updation_time:['',Validators.required],
      credit_card : ['',[Validators.pattern(/^(\d{16}|\d{4}-\d{4}-\d{4}-\d{4})$/)]]
    })
    
    //this.router.getCurrentNavigation()?.extras?.state?.['selectedUserDetails']
    this.userForm.patchValue({
      firstName : this.selectedUserDetails.name,
      lastName : this.selectedUserDetails.lastname,
      updation_time : new Date(this.selectedUserDetails.creation_time) 
  })
  }

  onSubmit(){
    console.log('date type is ',typeof(this.userForm.value.updation_time));
    var year = new Date(this.userForm.value.updation_time).getFullYear();
    console.log('year is :: ',year);
  }

  reset(){
    this.userForm.reset();
    console.log('resetting form fields',this.userForm.valid);
  // this.userForm.markAsPristine();
  // this.userForm.markAsUntouched();
  }

   formatCreditCard(credit_card_num:any){
    // const creditCardPattern = /^(\d{16}|\d{4}-\d{4}-\d{4}-\d{4})$/;
    // creditCardPattern.test(credit_card_num);
    let formatted_credit_card ="";
    let transformed_card ="";
    if(credit_card_num.includes("-")){
    formatted_credit_card = credit_card_num.replaceAll("-","") ;
     console.log('formatted_credit_card is:',formatted_credit_card) ; 
    }
   return transformed_card = formatted_credit_card.substring(0,4)+"-"+formatted_credit_card.substring(4,8)+"-"+formatted_credit_card.substring(8,12)+"-"+formatted_credit_card.substring(12,16);
}
  
}
