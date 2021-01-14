import React, { Component } from 'react';
import Counter from './count/Counter-BehaviorSubject';
import StopWatch from './count/StopWatch';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
        <StopWatch />
      </div>
    );
  }
}

export default App;
