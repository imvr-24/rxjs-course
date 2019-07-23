import { Observable } from "rxjs";

export function createHTTPObservable(url) {
    return Observable.create(observer => {
        // fetch('/api/courses')
        fetch(url)
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
}

