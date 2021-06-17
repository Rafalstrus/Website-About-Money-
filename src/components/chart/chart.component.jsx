import React from 'react';

import './chart.styles.css';
import {Line } from 'react-chartjs-2';


function changeData(props){
  state.datasets[0].data =[]
  state.labels = []
    props.chartData.rates.forEach(function (item, index) {
    (props.ratecode === 'PLN')? 
    state.datasets[0].data.push(item['mid']/props.currencyValue/3.8):
    state.datasets[0].data.push(item['mid']/props.currencyValue)
    state.labels.push(item['effectiveDate'])
  })
}

Array.min = function( array ){
  return Math.min.apply( Math, array );
};

function setMin(){
  var minData= Array.min(state.datasets[0].data)
  options.scales.yAxes[0].ticks.min =(minData-(10*minData/100))
}

const state = {
  labels: [],
  datasets: [
    {
      label: 'value',
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'red',
      pointRadius: 5,
      pointBackgroundColor: 'yellow',
      borderWidth: 2,
      data: []
    }
  ]

}

const options = {
    title:{
      display:false
    },
    scales: {
      yAxes: [{
          ticks: {
              min: 1
          }
      }]
  },
    legend:{
      display:false
    }
  }

export const ChartContainer = props =>(
    <div id="chart">
        <Line 
          data={state}
          options={options}
        />
          {(props.chartData.rates === undefined) ? '' :changeData(props)}
          {setMin()}
          {console.log(props.currencyValue)}
          {console.log(props.code)}
          {console.log(props.ratecode)}

    </div>

)




