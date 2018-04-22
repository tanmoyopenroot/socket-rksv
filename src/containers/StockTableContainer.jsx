import React from 'react';
import StockOptions from './../components/StockOptions';
import StockMaterialTable from './../components/StockMaterialTable';
import StockAreaChart from './../components/StockAreaChart';
import MaterialSnackbar from './../components/MaterialSnackbar';
import MaterialDiv from './../components/MaterialDiv';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import {
  connect,
  subscribe,
  unsubscribe,
  receiveData
 } from './../client/socket';

class StockTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      value: 0
    };
    this.stockTableData = [];
    this.stockChartData = [];
    this._subscribe = this._subscribe.bind(this);
    this._unsubscibe = this._unsubscibe.bind(this);
    this._updateSelectValue = this._updateSelectValue.bind(this);
    this._timeUp = this._timeUp.bind(this);
    this._timeDown = this._timeDown.bind(this);
    this._closeUp = this._closeUp.bind(this);
    this._closeDown = this._closeDown.bind(this);
  }

  componentWillMount() {
    this._connect();
  }

  componentDidUpdate() {
    const stockData = this.state.stockData;
    const value = this.state.value
    this._processData(stockData, value);
  }

  render() {
    const stockTableData = this.stockTableData;
    const stockChartData = this.stockChartData;
    const value = this.state.value;

    return (
      <div>
      {
        stockChartData.length ?
          this._renderAreaChart(stockChartData)
        : 
          null
      }
      <MaterialDiv>
        <StockOptions 
          updateSelectValue={this._updateSelectValue}
          value={value}
          subscribeHandler={this._subscribe}
          unsubscribeHandler={this._unsubscibe}
          histHandler={this.props.histHandler}
        />
        {
          stockTableData.length ?
            this._renderTable(stockTableData)
          : 
            null
        }
        <MaterialSnackbar
          ref="snackbar"
        />
      </MaterialDiv>
      </div>
    );
  }

  _renderAreaChart(stockChartData) {
    return (
      <StockAreaChart 
        data={stockChartData}
      />
    );
  }

  _renderTable(stockTableData) {
    const styleContainer = {
      maxHeight: '400px',
      overflow: 'hidden',
      overflowY: 'scroll'
    };

    return (
      <div style={styleContainer}>
        <Table >
          <TableHeader 
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>
                Year
              </TableHeaderColumn>
              <TableHeaderColumn>
                Open
              </TableHeaderColumn>
              <TableHeaderColumn>
                High
              </TableHeaderColumn>
              <TableHeaderColumn>
                Low
              </TableHeaderColumn>
              <TableHeaderColumn>
                Close
              </TableHeaderColumn>
              <TableHeaderColumn>
                Volume
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            <StockMaterialTable 
              stockTableData={stockTableData}
            />
          </TableBody>
        </Table>
      </div>
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
    this._receiveData();
    this.refs.snackbar.show('Subscribed');
    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1000);
  }

  _unsubscibe() {
    unsubscribe({ state: false });
    this.refs.snackbar.show('Unsubscribed');
    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1000);
  }

  _receiveData() {
    receiveData((data, cb) => {
      let stockData = this.state.stockData;
      stockData.push(data);
      this.setState({ stockData });
      cb(1);
    });
  }

  _updateSelectValue(value) {
    this.setState({ value });
  }
  
  _timeUp (a, b) {
    return a.timestamp - b.timestamp;
  }

  _timeDown (a, b) {
    return b.timestamp - a.timestamp;
  }

  _closeUp (a, b) {
    return a.close - b.close;
  }

  _closeDown (a, b) {
    return b.close - a.close;
  }

  _handleData(stockData) {
    return new Promise((resolve, reject) => {
      if (stockData.length) {
        let stockTableData = stockData.map((data, i) => {
          let obj = {};
          let splitedData = data.split(',');
          let d = new Date(parseInt(splitedData[0], 10));
          obj['new'] = Boolean(i === stockData.length - 1);
          obj['year'] = parseInt(d.getFullYear(), 10);
          obj['date'] = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
          obj['timestamp'] = parseInt(splitedData[0], 10);
          obj['open'] = parseInt(splitedData[1], 10);  
          obj['high'] = parseInt(splitedData[2], 10);  
          obj['low'] = parseInt(splitedData[3], 10);  
          obj['close'] = parseInt(splitedData[4], 10);   
          obj['volume'] = parseInt(splitedData[5], 10);        
          return obj;
        });
        resolve(stockTableData);
      } else {
        reject('error');
      }
    });
  }

  _processData(stockData, value) {
    let sortFunc = null;
    if (value === 1) {
      sortFunc = this._timeUp;
    } else if (value === 2) {
      sortFunc = this._timeDown;
    } else if (value === 3) {
      sortFunc = this._closeUp;
    } else if (value === 4) {
      sortFunc = this._closeDown;
    } else {
      sortFunc = null;
    }

    this._handleData(stockData)
      .then((data) => {
        this.stockChartData = data.slice(0);
        if (sortFunc) {
          this.stockTableData = data.sort(sortFunc);
        } else {
          this.stockTableData = data;
        }
      })
      .catch(err => {
        console.log("Error")
      });
  }
}

export default StockTableContainer;
