import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const StockOptions = (props) => {
  const value = props.value;

  const styleContainer = {
    textAlign: 'center',
  };

  const style = {
    margin: 12,
  };

  return (
    <div
      style={styleContainer}
    >
      <RaisedButton
        label="Get Historical"
        primary={true}
        style={style}
      />
      <RaisedButton
        label="Subscribe"
        primary={true}
        style={style}
      />
      <RaisedButton
        label="Unsubscribe"
        primary={true}
        style={style}
      />
      <SelectField
        floatingLabelText="Sort"
        value={value}
        onChange={(event, index, value) => props.updateSelectValue(value)}
      >
        <MenuItem 
          value={1} 
          primaryText="Time (Up)"
        />
        <MenuItem 
          value={2}
          primaryText="Time (Down)"
        />
        <MenuItem 
          value={3} 
          primaryText="Close (Up)"
        />
        <MenuItem 
          value={4} 
          primaryText="Close (Down)"
        />
      </SelectField>
    </div>
  );
}

StockOptions.prototype = {
  updateSelectValue: PropTypes.func,
  value: PropTypes.number
}

export default StockOptions;
