import React from 'react'

import { Option } from './option.component';
import './search-box.styles.css';

export const SearchBox = props => (
  <div id="Search-Box">
    <select name="cars" id="cars" onChange={e => {
      props.currencyValueChange(e.target.value)
      props.currencyCodeChange(e.target.options[e.target.selectedIndex].text)
    }
    }>
      {props.currency.map(
        (table, index) =>
          table.rates.map(rate => (
            <Option key={index + rate.code} rate={rate} />
          )
          )
      )}
    </select>
    <input 
    id="Search-Input"
    onChange={e => props.searchChange(e.target.value)}
    placeholder = "input amount"
    autoFocus 
    ></input>
  </div>
)