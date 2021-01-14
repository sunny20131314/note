import { fromEventPattern } from 'rxjs';
import EventEmitter from 'events';

const emitter = new EventEmitter();

const addHandler = (handler) => {
  emitter.addListener('msg', handler);
};

const removeHandler = (handler) => {
  emitter.removeListener('msg', handler);
};

const source$ = fromEventPattern(addHandler, removeHandler);

const subscription = source$.subscribe(
  console.log,
  (error) => console.log('catch', error),
  () => console.log('complete')
);

// 1
// 2
emitter.emit('msg', 1);
emitter.emit('msg', 2);
emitter.emit('another-msg', 'oops');

subscription.unsubscribe();

emitter.emit('msg', 'end');
