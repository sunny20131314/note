import React from 'react';

import {
  BehaviorSubject,
  Subject,
  Observable,
  interval,
  of,
  empty,
} from 'rxjs';
import {
  scan,
  merge,
  map,
  timeInterval,
  throwError,
  switchMap,
  tap,
  take,
} from 'rxjs/operators';

import padStart from 'lodash/padStart';

import observe from './observe';

const ms2Time = milliseconds => {
  let ms = parseInt(milliseconds % 1000, 10);
  let seconds = parseInt((milliseconds / 1000) % 60, 10);
  let minutes = parseInt((milliseconds / (1000 * 60)) % 60, 10);
  let hours = parseInt(milliseconds / (1000 * 60 * 60), 10);

  return (
    padStart(hours, 2, '0') +
    ':' +
    padStart(minutes, 2, '0') +
    ':' +
    padStart(seconds, 2, '0') +
    '.' +
    padStart(ms, 3, '0')
  );
};

const StopWatchView = ({ milliseconds, onStart, onStop, onReset }) => {
  return (
    <div>
      <h1>{ms2Time(milliseconds)}</h1>
      <button onClick={onStart}>开始</button>
      <button onClick={onStop}>停止</button>
      <button onClick={onReset}>重设</button>
    </div>
  );
};

const START = 'start';
const STOP = 'stop';
const RESET = 'reset';

const StopWatch = observe(
  StopWatchView,
  () => {
    const button = new Subject();

    const time$ = button.pipe(
      switchMap(value => {
        switch (value) {
          case START: {
            return interval(10).pipe(
              timeInterval(),
              scan((result, ti) => result + ti.interval, 0)
            );
          }
          case STOP:
            return empty();
          case RESET:
            return of(0);
          default:
            return throwError('Invalid value ', value);
        }
      })
    );

    const stopWatch = new BehaviorSubject(0);

    return stopWatch.pipe(
      merge(time$),
      map(value => ({
        milliseconds: value,
        onStop: () => button.next(STOP),
        onStart: () => button.next(START),
        onReset: () => button.next(RESET),
      }))
    );
  },
  0
);

export default StopWatch;
