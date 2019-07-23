import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHTTPObservable } from '../common/util';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];
        this.course$ = createHTTPObservable(`/api/courses/${this.courseId}`);


    }

    ngAfterViewInit() {

        const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(searchTerm => this.loadLessons(searchTerm))
            )
            .subscribe(console.log);

        const initialLessons$ = this.loadLessons();
        this.lessons$ = concat(initialLessons$, searchLessons$);
    }

    loadLessons(searchTerm = ""): Observable<Lesson[]> {
        return this.lessons$ = createHTTPObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${searchTerm}`)
            .pipe(map(res => res["payload"]))
    }


}
