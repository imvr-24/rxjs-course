import { Observable } from "rxjs";

export function createHTTPObservable(url: string) {
    return Observable.create(observer => {
        // fetch('/api/courses')

        const controller =  new AbortController();
        const signal = controller.signal;

        fetch(url, { signal })
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

        return () => controller.abort();
    });
}

