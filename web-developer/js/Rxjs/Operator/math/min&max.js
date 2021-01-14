import { from, of, timer, interval } from 'rxjs';
import { isEmpty, tap, take, source, max, min } from 'rxjs/operators';

// 9|
const source$ = of(3, 1, 4, 1, 5, 9).pipe(max());

// 1|
// const source$ = of(3, 1, 4, 1, 5, 9).pipe(min());

// {name: "RxJS", year: 2011}|
// const source$ = of(
//   { name: 'RxJS', year: 2011 },
//   { name: 'React', year: 2013 },
//   { name: 'Redux', year: 2015 }
// ).pipe(min((a, b) => a.year - b.year));

source$.subscribe(
  console.log,
  (e) => console.log(e),
  () => console.log('complete')
);
