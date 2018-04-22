import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class StockOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };
    this._handleOpenMenu = this._handleOpenMenu.bind(this);
    this._handleCloseMenu = this._handleCloseMenu.bind(this);
  }

  render() {
    const value = this.props.value;
    const styleContainer = {
      textAlign: 'center',
    };
    const styleRaisedButton = {
      margin: 12,
    };
    const selectFieldStyle = {
      height: '90px',
      width: '170px',
      marginLeft: '12px'
    }
  
    return (
      <div
        style={styleContainer}
      >
        <RaisedButton
          label="Get Historical"
          primary={true}
          style={styleRaisedButton}
          onClick={() => this.props.histHandler()}
        />
        <RaisedButton
          label="Subscribe"
          primary={true}
          style={styleRaisedButton}
          onClick={() => this.props.subscribeHandler()}
        />
        <RaisedButton
          label="Unsubscribe"
          primary={true}
          style={styleRaisedButton}
          onClick={() => this.props.unsubscribeHandler()}
        />
  
        <SelectField
          floatingLabelText="Sort"
          hintText="Sort"
          value={value}
          onChange={(event, index, value) => this.props.updateSelectValue(value)}
          style={selectFieldStyle}
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

  _handleCloseMenu(value) {
    this.setState({ openMenu: false });
    this.props.updateSelectValue(value)
  }

  _handleOpenMenu() {
    this.setState({ openMenu: true });
  }
}

export default StockOptions;
