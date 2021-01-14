import React, { useState, useEffect, useMemo } from 'react';

const observe = (WrappedComponent, observableFactory, defaultState) => {
  return React.memo(props => {
    const [state, setState] = useState(defaultState);

    const observable$ = useMemo(() => {
      return observableFactory(props, state);
    }, []);

    useEffect(() => {
      const subscription = observable$.subscribe(v => setState(v));
      return () => {
        subscription.unsubscribe();
      };
    }, []);

    return <WrappedComponent {...props} {...state} />;
  });
};

export default observe;
