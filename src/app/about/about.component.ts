import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject, AsyncSubject, ReplaySubject } from 'rxjs';
import { delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        // Subject observable & an observer

        // BehaviorSubject remembers the last emitted value.

        // AsyncSubject.    async operations like final value of calculations
        // AsyncSubject value gets the last value emitted before completion


        // ReplaySubject. Late subscription will get all the values from early subscription.


        // const subject = new Subject();
        // const subject = new BehaviorSubject(0);

        const subject = new ReplaySubject();

        const series$ = subject.asObservable();

        series$.subscribe(data => console.log('early subscription ' + data));

        subject.next(1);
        subject.next(2);
        subject.next(4);
        subject.next(12);


        // subject.complete();

        setTimeout(() => {
            series$.subscribe(data => console.log('Late subscription ' + data));
            subject.next(52);
        }, 3000);

    }


}






