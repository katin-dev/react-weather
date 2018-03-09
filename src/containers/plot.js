import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import _ from 'lodash';

class Plot extends Component {
  render() {
    if (!this.props.data || this.props.data.length == 0) {
      return <div>No chart data</div>;
    }

    // Из полученных интервалов сформируем данные для графика
    const labels = [];
    const values = [];
    this.props.data.map((chunk) => {
      labels.push(chunk.start.getHours() + ':' + chunk.start.getMinutes());
      values.push(Math.round(_.sum(chunk.values) / chunk.values.length));
    });

    const plotData = {
      labels: labels,
      datasets: [
        {
          label: this.props.label,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0,
          data: values,
        }
      ]
    };

    return (
      <Line data={ plotData } height={100} />
    );
  }
}

function mapState2Props({ data }) {
  return { data }
}

export default connect(mapState2Props)(Plot);
