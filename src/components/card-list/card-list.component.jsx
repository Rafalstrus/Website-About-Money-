import React from 'react';

import './card.styles.css';
import { Card } from './card.component';

let count = 0  //countinge cards

export const CardList = props => (
  <div className='card-list' >
    {props.currencyTable.map(
      (table, index) =>
        table.rates.map(rate => {
          console.log()
          count += 1
          return (
            <Card
              key={index + rate.code}
              index={count % 151 > 0 ? count % 151 : 150}
              rate={rate}
              search={props.search}
              currencyselectedCode={props.currencyselectedCode}
              currencyValue={props.currencyValue}
              currencyCodeChange={props.currencyCodeChange}
              currencyValueChange={props.currencyValueChange}
              getChartData={props.getChartData}
              chartData={props.chartData}
              table={table}
              USDValue={props.USDValue}
              handleSelectedID={props.handleSelectedID}
            />)
            
        }
        )
    )}
  </div>
)
