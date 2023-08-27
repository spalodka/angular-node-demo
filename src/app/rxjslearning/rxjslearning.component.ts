import { AfterViewInit, Component, OnDestroy, OnInit, setTestabilityGetter } from '@angular/core';
import { Subject,BehaviorSubject, mergeMap, from, concatMap, forkJoin ,filter, map, of, Observable, distinct, catchError, EMPTY, exhaustMap, takeUntil, take, shareReplay} from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-rxjslearning',
  templateUrl: './rxjslearning.component.html',
  styleUrls: ['./rxjslearning.component.scss']
})
export class RxjslearningComponent {

  constructor(public httpclient : HttpClient,
    public router:Router,
    public authService : AuthService){

}

  sub1$ = new BehaviorSubject<number>(1);
  sub2$ :any;
  userapi:any;
  posts:any;
  apiresponse = [];
  filterResponse:any;
  userResponse:any;
  postResponse:any;
  urls :any;
  photos:any;
  observable:any;
  ngOnInit(): void {
    // this.sub1$.next(11);
    // // this.sub1$.next(2);
    // this.sub1$.next(3);
    // this.sub1$.next(4);
    // this.sub1$.next(5);
    // this.sub1$.subscribe((data:any)=>{
    //   console.log(data);
    // })
    // this.sub1$.next(2);
    // this.sub1$.next(3);
    // this.sub1$.subscribe((data:any)=>{
    //   console.log('sub 2 :',data);
    // })
    // this.sub1$.next(7);
    console.log('Auth Service is :: ',this.authService);
    this.userapi = this.httpclient.get('https://jsonplaceholder.typicode.com/users').pipe(shareReplay(1));
    this.posts = this.httpclient.get('https://jsonplaceholder.typicode.com/posts');
    let todos = this.httpclient.get('https://jsonplaceholder.typicode.com/todos');
    this.photos = this.httpclient.get('https://jsonplaceholder.typicode.com/photos');
    this.urls = [this.photos,this.userapi,this.posts,this.posts];
     this.observable = forkJoin(this.urls);

    this.filterResponse = this.userapi.pipe( 
      map((content:any) =>{
      return content.filter((item:any)=>item['id'] > 5)
      }
    )
    )
    this.filterResponse.subscribe((response:any)=>{
        this.apiresponse = response;
        console.log('this.filterResponse is 1 :: ',this.apiresponse);
        this.apiresponse.
        map((item:any)=>{
       let id = item['id'];
        console.log('id is ::',id)
       this.httpclient.get('https://jsonplaceholder.typicode.com/posts/'+id)
       .subscribe((val)=>{
           this.postResponse = val;
           console.log('post response is :: ',this.postResponse);
       });
      })
        })
    
  }

   getData(){
    //fork join will cancel all subscription on error .EMPTY with catch error used to not showing any error on console
      this.observable.pipe(
        catchError((err) => 
         // EMPTY
         of (undefined)
        )
      )
      .subscribe({  
       // console.log('this.posts is :: ',response);
        next :(value:any) => 
         console.log('value is :: ',value),
        complete : () => console.log(this.posts)
      })  
   }

   getMergeMapData(){
    //mergemap will send request in parallel without perserving request order
    //if outer subscription fails it will not do inner subscription
   this.sub2$ = this.httpclient.get("https://jsonplaceholder.typicode.com/users/")
  .pipe(
    exhaustMap((persons:any) => {
      const home = persons.map((person :any) => this.httpclient.get('https://jsonplaceholder.typicode.com/posts/'+person.id))
      return forkJoin(home);
   // return this.httpclient.get('https://jsonplaceholder.typicode.com/posts/1')
    })
  )
.subscribe(res => {
  console.log('final response is ', res)
})
   }
  shareReplayDemo(){
    //using sharereplay we can subscribe to (http) observable multiple times with api request
      this.userapi.subscribe((res:any)=>{
          console.log('user list is :: ',res);
      });
    }
   back(){
      this.router.navigate(['/login']);
   }
   navigateToUser(){
    this.router.navigate(['/users']);
   }
   ngOnDestroy(): void {
    this.sub1$.unsubscribe();
  }


}
