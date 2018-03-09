import React, { Component } from 'react';
import Plot from './containers/plot';
import logo from './logo.svg';
import data from './weather-data';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Weather</h1>
        <Plot label="CO2" />
      </div>
    );
  }
}

export default App;
