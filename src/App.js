import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import logo from './logo.svg';
import data from './weather-data';
import EventEmitter from 'eventemitter3';
import './App.css';

const eventEmitter = new EventEmitter();

window.setInterval(() => {
  data.push(['05.16:26', Math.random() * 500]);
  eventEmitter.emit("update", data);
}, 1000);

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: data
    }

    eventEmitter.on('update', (data) => {
      this.setState({ data: data });
    });
  }

  render() {

    const lineData = {
      labels: this.state.data.map( (item) => { return item[0] }),
      datasets: [
        {
          label: 'CO2',     
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0,
          data: this.state.data.map( (item) => { return item[1] }),
        }
      ]
    };

    return (
      <div className="App">
        <h1>Weather</h1>
        <Line data={ lineData } height={100} />
      </div>
    );
  }
}

export default App;
