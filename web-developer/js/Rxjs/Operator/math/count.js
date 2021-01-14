import { from, of, timer, interval } from 'rxjs';
import { isEmpty, tap, take, count, concat } from 'rxjs/operators';

// 0 - 10, 10
// const count$ = interval(100).pipe(tap(console.log), take(10), count());

// 2
const count$ = timer(1000).pipe(
  concat(timer(1000)),
  // 0
  // 0
  tap(console.log),
  take(10),
  count()
);

// 5
// const count$ = of(1, 2, 3, 5, 7).pipe(tap(console.log), take(10), count());

count$.subscribe(
  console.log,
  (e) => console.log(e),
  () => console.log('complete')
);
