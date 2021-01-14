import { empty, from, of, interval } from 'rxjs';
import { defaultIfEmpty, every, tap } from 'rxjs/operators';

// false
// complete
const source$ = of(3, 1, 4, 1, 5, 9);
source$.pipe(every((x) => x > 3)).subscribe(console.log, null, () => console.log('complete'));

// true
// complete
source$.pipe(every((x) => x > 0)).subscribe(console.log, null, () => console.log('complete'));

// 0
// false
// complete
interval(1000)
  .pipe(
    tap(console.log),
    every((x) => x > 3)
  )
  .subscribe(console.log, null, () => console.log('complete'));
