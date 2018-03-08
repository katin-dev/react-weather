import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

class Plot extends Component {
  render() {
    if (!this.props.data || this.props.data.length == 0) {
      return <div>No chart data</div>;
    }

    const plotData = {
      labels: this.props.data.map( (item) => { return item[0] }),
      datasets: [
        {
          label: this.props.label,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0,
          data: this.props.data.map( (item) => { return item[1] }),
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
