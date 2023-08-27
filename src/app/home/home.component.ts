import { AfterViewInit, Component, OnDestroy, OnInit, setTestabilityGetter } from '@angular/core';
import { Subject,BehaviorSubject, mergeMap, from, concatMap, forkJoin ,filter, map, of, Observable, distinct, catchError, EMPTY, exhaustMap, takeUntil, take, shareReplay} from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy {
  constructor(public httpclient : HttpClient,
              public router:Router,
              public authService : AuthService){

  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
  
  }
  
 
 
}
