import { empty, from, of, never, interval, Observable, throwError } from 'rxjs';
import { isEmpty, tap } from 'rxjs/operators';

// true
// complete
// const source$ = new Observable(observer => {
//   setTimeout(() => observer.complete(1), 5000);
// });

// true
// complete
// const source$ = empty();

// wrong ...
// const source$ = throwError(new Error('wrong'));

// false
// complete
// const source$ = interval(1000);

// nothing
const source$ = never();
const isEmpty$ = source$.pipe(isEmpty());

isEmpty$.subscribe(
  console.log,
  (e) => console.log(e),
  () => console.log('complete')
);
