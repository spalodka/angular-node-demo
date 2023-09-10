import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OnSameUrlNavigation } from '@angular/router';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit{
  constructor(private fb : FormBuilder){

  }
  userForm:any;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName:['',Validators.required]
    })
  }
  
}
