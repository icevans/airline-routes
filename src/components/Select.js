import React from 'react';

const Select = (props) => {
  return (
    <select onChange={props.onChange} value={props.value}>
      <option value=''>{props.allTitle}</option>
      {props.options.map(option => (
        <option 
          value={option[props.valueKey]}
        >
          {option[props.titleKey]}
        </option>
      ))}
    </select>
  );
}

export default Select;
