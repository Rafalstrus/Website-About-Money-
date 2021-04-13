import React from 'react';

import './card-list.styles.css';
import {ChartContainer} from '../chart/chart.component'


export const Card = props => (
  <div className='card-container' style={{display: props.code === props.rate.code? 'none': ''}  }
  onClick={()=>{
    props.getChartData(props.rate.code,props.table.table)
    try {
    var searchIfExistId = document.getElementById('selected')
    searchIfExistId.removeAttribute("id");
    }catch (error) {
    }
    var clickedCard = document.getElementsByClassName('card-container')
    if(clickedCard[props.index-1].getAttribute("id")==="selected")
    {clickedCard[props.index-1].removeAttribute("id")}
    else
    {
      clickedCard[props.index-1].setAttribute("id", "selected");
    }
  }
}>
    <p className='currency-name'>{props.rate.code} {props.rate.currency}</p>
    <p className='currency-value'>{(props.currencyValue/props.rate.mid).toFixed(5)}</p>
    <p className='exchange-value'>
      {props.search ? ((props.currencyValue/props.rate.mid) * props.search).toFixed(5) : ''}
    </p>
    {/*chartExist ?<ChartContainer/> : null*/}
  <p>{
      console.log(document.getElementsByClassName('card-container')[props.index-1])
  }</p>
  </div>
)
/*
      
          /*chartData={this.state.chartCode}
          chartLoad = {this.state.chartLoad}
          />
*/ 