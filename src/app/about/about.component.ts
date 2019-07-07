import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { interval, timer, fromEvent, Observable, noop } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {

    // promise vs observable

    // promise -- will be immediately executed.
    // observable -- I will only trigger the request once any subsciption happens.

    // 1. create custom http Observable.

    // defination of http stream.
    const http$ = Observable.create(observer => {
      fetch('/api/courses')
            .then(res => {
              return res.json();
            })
            .then(body => {
              observer.next(body);

              observer.complete();

            })
            .catch(err => {
              observer.error(err);
            });
    });

    // creation of http stream.
    http$.subscribe(
      courses => console.log(courses),
      noop,
      // (err) => {},
      () => { console.log('Completed..') }
    );

    // rxjs - reactive extensions for javascript.

    // stream of values.

    // What is an rxjs observable.

    // const interval$ = interval(1000); // defination of stream of values.
    // const interval$ = timer(1000, 1000); // defination of stream of values.

    // interval$.subscribe(val => console.log('stream 1 => ' + val)); // Creation of stream of values.
    // const sub = interval$.subscribe(val => console.log('stream 2 => ' + val)); // Creaton of stream of values.

    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 5000);

    // const click$ = fromEvent(document, 'click'); // defination of stream.
    // click$.subscribe(
      // event => console.log(event),
      // err => console.log(err),
      // () => console.log('Stream is completed!!')
    // ); // stream of values.

    // complex way of combining streams.

    // document.addEventListener('click', clickevnt => {
    //   console.log(clickevnt);
    //   setTimeout(() => {
    //     console.log(`Timeput has elapsed`);
    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });

  }

  ngOnDestroy() {

  }
}
