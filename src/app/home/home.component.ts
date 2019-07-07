import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop, ObservableInput, concat } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter, concatAll } from 'rxjs/operators';
import { createHTTPObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Imperative Approach : populate values of courses of different category in success callback.

    // Reactive Approach : passing Observables to templates. via async pipe.


    beginnersCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {
        // defination of http stream.
        const http$: Observable<Course[]> = createHTTPObservable('/api/courses');
        const courses$: Observable<any[]> = http$
            .pipe(
                tap(() => console.log(`http request 1`)),
                map(res => {
                    console.log(res);
                    console.log(Object.values(res));
                    console.log(Object.values(res['payload']));
                    return Object.values((res['payload']));
                }),
                shareReplay()
            );

        courses$.subscribe(a => console.log(a)); // 3 http requests

        this.beginnersCourses$ = courses$.pipe(
            map(
                courses => courses.filter(course => course.category === 'BEGINNER')
            )
        );

        this.advancedCourses$ = courses$.pipe(
            map(
                courses => courses.filter(course => course.category === 'ADVANCED')
            )
        );

        // creation of http stream.

        // courses$.subscribe(
        //     courses => {
        //         this.beginnersCourses = courses.filter( course => course.category === 'BEGINNER');
        //         this.advancedCourses = courses.filter( course => course.category === 'ADVANCED');
        //     },
        //     noop,
        //     // (err) => {},
        //     () => { console.log('Completed..') }
        // );


        // Observable Concatenation. concatMap() operator.

        // defining Observable using of()
        const source1$ = interval(1000);
        const source2$ = of(4, 5, 6);
        const source3$ = of(7, 8, 9, 10);

        // sequential operation.

        const result$ = concat(source1$, source2$, source3$);
        // result$.subscribe(console.log);
        result$.subscribe(v => console.log(v));
        
        // concat(
        //     of(1, 2, 3),
        //     // subscribed after first completes
        //     of(4, 5, 6),
        //     // subscribed after second completes
        //     of(7, 8, 9)
        // )
        //     // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
        //     .subscribe(console.log);
    }

}
