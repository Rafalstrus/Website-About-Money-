import React from 'react';

import './card.styles.css';
import { Card } from './card.component';

function returnLength(props) {
  return ((props.currencyTable[0].rates.length) + props.currencyTable[1].rates.length + props.currencyTable[2].rates.length)
}

let count = 0  //countinge cards

export const CardList = props => (
  <div className='card-list' >
    {props.currencyTable.map(
      (table, index) =>
        table.rates.map(rate => {
          count += 1
          return (
            <Card
              key={index + rate.code}
              index={count % returnLength(props) > 0 ? count % returnLength(props) : returnLength(props)}
              rate={rate}
              search={props.search}
              currencyselectedCode={props.currencyselectedCode}
              currencyValue={props.currencyValue}
              currencyCodeChange={props.currencyCodeChange}
              handleCurrencySelectedCodeChange={props.handleCurrencySelectedCodeChange}
              getChartData={props.getChartData}
              chartData={props.chartData}
              table={table}
              USDValue={props.USDValue}
              handleSelectedID={props.handleSelectedID}
              selectedID={props.selectedID}
            />)

        }
        )
    )}
  </div>
)
