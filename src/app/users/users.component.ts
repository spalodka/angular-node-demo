import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '../services/auth.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit ,OnChanges , AfterViewChecked ,AfterContentChecked ,AfterContentInit,AfterViewInit,DoCheck{
  usersList :any = [];
  constructor(private httpClient:HttpClient,
              private router:Router,
              private authService : AuthService){

  }
  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/getUsersList`).subscribe((res:any)=>{
       this.usersList = res.data;
    })
  }
  
  editUser(user:any){
    console.log('selected user is ',user);
    const navigationExtras: NavigationExtras = { state: {selectedUserDetails:user}};
     this.router.navigate(["users/userAction"],navigationExtras);
  }

  deleteUser(user:any){
    this.router.navigateByUrl("users/userAction");
  }

  generatePDF() {
    const documentDefinition = {
      content: [
        { text: 'Users Data in PDF', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['FIRST NAME', ' LAST NAME', 'USERNAME', 'PASSWORD'],
              ...this.usersList.map((item:any) => [item.name, item.lastname, item.username, item.password]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

     pdfMake.createPdf(documentDefinition).download();
   // window.print(); // it will open print & pdf view with whole screen
  }

 


  ngOnChanges(changes: SimpleChanges): void {
    console.log('*************** inside ngOnChanges  **************');
  }
  ngAfterViewInit(): void {
    console.log('*************** inside ngAfterViewInit  **************');
  }
  ngAfterContentInit(): void {
    console.log('*************** inside ngAfterContentInit  **************');
  }
  ngAfterContentChecked(): void {
    console.log('*************** inside ngAfterContentChecked  **************');
  }
  ngAfterViewChecked(): void {
    console.log('*************** inside ngAfterViewChecked  **************');
  }
  ngDoCheck(): void {
    console.log('*************** inside ngDoCheck  **************');
  }
}
