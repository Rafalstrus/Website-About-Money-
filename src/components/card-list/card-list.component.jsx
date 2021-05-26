import React from 'react';

import './card.styles.css';
import { Card } from './card.component';

let count = 0

export const CardList = props => (
  <div className='card-list' >
    {props.currency.map(
      (table, index) =>
        table.rates.map(rate => {
          count+=1
          return (
          <Card
            key={index + rate.code}
            index = {count%151>0 ? count%151: 150}
            rate={rate}
            search={props.search}
            code={props.code}
            currencyValue={props.currencyValue}
            currencyCodeChange={props.currencyCodeChange}
            currencyValueChange = {props.currencyValueChange}
            getChartData={props.getChartData}
            table={table}
          />)
        }
        )
    )}
  </div>
)