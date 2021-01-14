import EventEmitter from 'events';
import { fromEvent } from 'rxjs';

const emitter = new EventEmitter();
const source$ = fromEvent(emitter, 'msg');

const subscription = source$.subscribe(
  console.log,
  (error) => console.log('catch', error),
  () => console.log('complete')
);

emitter.emit('msg', 1);
emitter.emit('msg', 2);
emitter.emit('another-msg', 'oops');
emitter.emit('msg', 3);

// 1
// 2
// 3
subscription.unsubscribe();
emitter.emit('msg', 'end');
