import React, { Component } from 'react';
import MaterialAppBar from './components/MaterialAppBar';
import HistoricalGraphContainer from './containers/HistoricalGraphContainer';
import StockTableContainer from './containers/StockTableContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHist: false
    };
    this._histHandler = this._histHandler.bind(this);
  }

  render() {
    return (
      <div>
        <MaterialAppBar 
          title="Real Time OHLC Feed Demo"
          showMenuIconButton={false}
        />
        {
          this.state.showHist ?
            <HistoricalGraphContainer />
          :
            null
        }
        <StockTableContainer 
          histHandler={this._histHandler}
        />
      </div>
    );
  }

  _histHandler() {
    this.setState({ showHist: true });
  }

}

export default App;
