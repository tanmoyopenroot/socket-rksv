import React, { Component } from 'react';
import MaterialAppBar from './components/MaterialAppBar';
import HistoricalGraphContainer from './containers/HistoricalGraphContainer';
import StockTableContainer from './containers/StockTableContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
    };
  }

  render() {
    return (
      <div>
        <MaterialAppBar 
          title="Real Time OHLC Feed Demo"
          showMenuIconButton={false}
        />
        <HistoricalGraphContainer />
        <StockTableContainer />
      </div>
    );
  }

}

export default App;
