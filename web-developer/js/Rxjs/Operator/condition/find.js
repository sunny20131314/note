import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { find } from 'rxjs/operators';

const source$ = of(3, 1, 4, 1, 5, 9);
// undefined
// complete
const find$ = source$
  .pipe(find((x) => x > 10))
  .subscribe(console.log, null, () => console.log('complete'));

// 5
// complete
const find1$ = source$
  .pipe(find((x) => x > 4))
  .subscribe(console.log, null, () => console.log('complete'));
