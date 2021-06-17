import React from 'react';

import './chart.styles.css';
import {Line } from 'react-chartjs-2';

function changeData(props){
  state.datasets[0].data =[]
  state.labels = []
    props.chartData.rates.forEach(function (item, index) {
    console.log(item['effectiveDate'],item['mid']);
    state.datasets[0].data.push(item['mid'])
    state.labels.push(item['effectiveDate'])
})}

const state = {
  labels: [],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'red',
      borderWidth: 2,
      data: []
    }
  ]
}

export const ChartContainer = props =>(
    <div id="chart">
        <Line 
          data={state}
          options={{
            title:{
              display:false
            },
            legend:{
              display:false
            }
          }}
        />
          {(props.chartData.rates === undefined) ? '' :changeData(props)}
    </div>

)




