import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { mergeMap, startWith, takeUntil, tap } from 'rxjs/operators';
import { interval, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit, OnDestroy {

  url = 'https://dog.ceo/api/breeds/list/all'
  object: Object | undefined;

  destroy$ = new Subject<boolean>();
  subscription: Subscription | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getWithInterval()
    this.getWithIntervalUnsubscribe();
  }

  //first call
  getCall() {
    this.http.get(this.url).pipe(
      tap((value) => { console.log(value); })
    ).subscribe()
  }

  // without unsubscribe

  getWithInterval() {
    interval(10000).pipe(
      startWith(0),
      mergeMap(() => this.http.get(this.url)),
      tap((value) => { console.log(value); })
    ).subscribe()
  }


  getWithIntervalUnsubscribe() {
    this.subscription = interval(10000).pipe(
      startWith(0),
      mergeMap(() => this.http.get(this.url)),
      tap((value) => {
        this.object = value;
        console.log(value);
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }




}
