import React from 'react'

import { Option } from './option.component';
import './search-box.styles.css';


function filterData(e,change){
console.log(e)
let pattern = /^[0-9]+\.?[0-9]*$/
//potestuj potem
if(e.match(pattern) && e.length<8) { change(e)}
else if(e.length===0){change(e)}
}

export const SearchBox = props => (
  <div id="Search-Box">
    <select name="cars" id="cars" onChange={e => {
      props.currencyValueChange(e.target.value)
      props.currencyCodeChange(e.target.options[e.target.selectedIndex].text)
    }
    } >
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
    onChange={e => filterData(e.target.value,props.searchChange)}
    placeholder = "input amount"
    autoFocus 
    value={props.search}
    ></input>
    {console.log()}
  </div>
)