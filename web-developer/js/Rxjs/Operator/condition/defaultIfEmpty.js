import { empty, from, of } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';

const source$ = empty();
// this is default
// complete
source$
  .pipe(defaultIfEmpty('this is default'))
  .subscribe(console.log, null, () => console.log('complete'));

// null
// complete
source$.pipe(defaultIfEmpty()).subscribe(console.log, null, () => console.log('complete'));

// 1
// complete
of(1)
  .pipe(defaultIfEmpty())
  .subscribe(console.log, null, () => console.log('complete'));
