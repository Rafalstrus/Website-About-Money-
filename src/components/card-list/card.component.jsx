import React from 'react';

import './card-list.styles.css';
import { ChartContainer } from '../chart/chart.component'


export const Card = props => (
  <div className='card-container' style={{ display: props.currencyselectedCode === props.rate.code ? 'none' : '' }}
    onClick={() => {
      var clickedCard = document.getElementsByClassName('card-container')
      if (clickedCard[props.index - 1].getAttribute("id") === "selected") {
        document.getElementById('chart').style.display = 'none';
        clickedCard[props.index - 1].removeAttribute("id")
        props.handleSelectedID("")
      }
      else {
        var searchIfExistId = document.getElementById('selected')
        if (searchIfExistId) {
          searchIfExistId.removeAttribute("id");
          props.handleSelectedID("")
        }
        props.handleSelectedID(props.index - 1)
        clickedCard[props.index - 1].setAttribute("id", "selected");
        props.getChartData(props.rate.code, props.table.table)

      }
    }
    }>
    <p className='currency-name'>{props.rate.code} {props.rate.currency}</p>
    <p className='currency-value'>{(props.rate.mid / props.currencyValue).toFixed(5)}</p>
    <p className='exchange-value'>
      {props.search ? ((props.currencyValue / props.rate.mid) * props.search).toFixed(5) : ''}
    </p>
  {makeChart(props.index, props.chartData, props.currencyValue, props.rate.code, props.rate.mid, props.USDValue)}
  </div>
)

function makeChart(index, chartData, currencyValue, ratecode, ratemid, USDValue) {
  try {
    if (document.getElementsByClassName('card-container')[index - 1].getAttribute("id") === "selected") {
      return <ChartContainer
        chartData={chartData}
        currencyValue={currencyValue}
        ratemid={ratemid}
        ratecode={ratecode}
        USDValue={USDValue}
      />
    }
    document.getElementById('chart').style.display = 'block';
  }
  catch (e) {
  }
}
/*

          /*chartData={this.state.chartCode}
          chartLoad = {this.state.chartLoad}
          />
*/