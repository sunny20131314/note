import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { findIndex } from 'rxjs/operators';

const source$ = of(3, 1, 4, 1, 5, 9);
// -1
// complete
const findIndex$ = source$
  .pipe(findIndex((x) => x > 10))
  .subscribe(console.log, null, () => console.log('complete'));

// 4
// complete
const findIndex1$ = source$
  .pipe(findIndex((x) => x > 4))
  .subscribe(console.log, null, () => console.log('complete'));
