import React from 'react';
import FlatButtonContainer from './../containers/FlatButtonContainer';
import StockMaterialTable from './../components/StockMaterialTable';
import MaterialSnackbar from './../components/MaterialSnackbar';
import MaterialDiv from './../components/MaterialDiv';
import {
  connect,
  subscribe,
  receiveData
 } from './../client/socket';

class StockTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    };
    this.stockTableData = [];
    this._updateState = this._updateState.bind(this);
  }

  componentWillMount() {
    this._connect();
    this._subscribe();
    this._receiveData();
    // setInterval(this._updateState, 2000);
    console.log("MOUNT");
  }

  componentDidUpdate() {
    const stockData = this.state.stockData;
    this._processData(stockData);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.stockData.length != nextState.stockData;
  // }

  render() {
    const stockTableData = this.stockTableData;
    return (
      <MaterialDiv>
        {
          stockTableData ?
            <StockMaterialTable 
              stockTableData={stockTableData}
            />
          : 
          null
        }
        <FlatButtonContainer />
        <MaterialSnackbar
          ref="snackbar"
        />
      </MaterialDiv>
    );
  }

  _connect() {
    connect(() => {
      this.refs.snackbar.show('Connected to the server');
      setTimeout(() => {
        this.refs.snackbar.dismiss();
      }, 2000);
    });
  }

  _subscribe() {
    subscribe({ state: true });
  }

  _receiveData() {
    receiveData((data, cb) => {
      let stockData = this.state.stockData;
      stockData.push(data);
      this.setState({ stockData });
      // console.log('Data Length : ', this.stockData.length);
      cb(1);
    });
  }

  _updateState() {
    const latestStockData = this.stockData;
    this.setState({ stockData: latestStockData });
  }

  _processData(stockData) {
    if (stockData.length) {
      this.stockTableData = stockData.map(data => {
        let obj = {};
        let splitedData = data.split(',');
        obj['year'] = (new Date(parseInt(splitedData[0], 10))).getFullYear();
        obj['open'] = parseInt(splitedData[1]);  
        obj['high'] = parseInt(splitedData[2]);  
        obj['low'] = parseInt(splitedData[3]);  
        obj['close'] = parseInt(splitedData[4]);   
        obj['volume'] = parseInt(splitedData[5]);        
        return obj;
      });

      // console.log(this.stockTableData);
      // this.setState({ stockTableData });
    }
  }
}

export default StockTableContainer;
