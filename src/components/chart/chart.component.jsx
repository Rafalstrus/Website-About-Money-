import React from 'react';

import './chart.styles.css';
import {Line } from 'react-chartjs-2';

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'red',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
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
        <p>{console.log(props.chartData.rates)}</p>
        {}
        <p>{console.log(props.chartData.rates)}</p>
    </div>

)

