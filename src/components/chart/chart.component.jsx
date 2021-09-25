import React from 'react';

import './chart.styles.css';
import { Line } from 'react-chartjs-2';

let average = (array) => array.reduce((a, b) => +(a) + +(b)) / array.length

Array.min = function (array) {
  return Math.min.apply(Math, array);
};


function changeData(props) {
  state.datasets[0].data = []
  state.labels = []
  props.chartData.rates.forEach(function (item, index) {
    (props.ratecode === 'PLN') ?
      state.datasets[0].data.push((item['mid'] / props.currencyValue / props.USDValue).toFixed(5)) :
      state.datasets[0].data.push((item['mid'] / props.currencyValue).toFixed(5))
    state.labels.push(item['effectiveDate'])
  })
}

function setMin() {
  var minData = Array.min(state.datasets[0].data)
  options.scales.yAxes[0].ticks.suggestedMin  = (minData - (10 * minData / 100))

}

const state = {
  labels: [],
  datasets: [
    {
      fill: false,
      borderColor: 'red',
      pointRadius: 7,
      pointBackgroundColor: 'red',
      borderWidth: 10,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]

}

const options = {
  title: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        fontSize: 20

      }
    }],
    xAxes: [{
      ticks: {
        fontSize: 20
      }
    }]
  },
  legend: {
    display: false
  },
  tooltips: {
    displayColors: false,
    titleFontSize: 20,
    bodyFontColor: "rgb(0, 189, 0)",
    bodyFontSize: 30,
    xPadding: 30,
    yPadding: 30,
    width: 100
  }
}

export const ChartContainer = props => (
  <div id="chart">
    <Line
      width={window.innerWidth/3.6}
      data={state}
      options={options}
    />
    {(props.chartData.rates === undefined) ? '' : changeData(props)}
    {setMin()}
    <p id="avg">avg :{average(state.datasets[0].data).toFixed(5)}</p>
  </div>

)




