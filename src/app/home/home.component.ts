import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';
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
        const courses$ =  http$
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

        courses$.subscribe( a => console.log(a) ); // 3 http requests

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

    }

}
