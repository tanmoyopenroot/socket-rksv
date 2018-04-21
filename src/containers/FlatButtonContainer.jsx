import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class FlatButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = {
      margin: 12,
    };
    return (
      <div>
        <RaisedButton label="Get Historical" primary={true} style={style} />
        <RaisedButton label="Subscribe" primary={true} style={style} />
        <RaisedButton label="Unsubscribe" primary={true} style={style} />
        <RaisedButton label="Sort" primary={true} style={style} />
      </div>
    );
  }
}

export default FlatButtonContainer;
