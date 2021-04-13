import React from 'react';

export const Option = props => (
      <option className = 'currency-code'  value = {props.rate.mid}>
            {props.rate.code} 
            </option>
)