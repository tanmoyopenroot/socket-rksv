import React from 'react';
import MaterialSnackbar from './../components/MaterialSnackbar';
import StockAreaChart from './../components/StockAreaChart';
import getHist from './../api';

class HistoricalGraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._getHist();
  }

  render() {
    return (
      <div>
        {
          this.state.plotData ?
            <StockAreaChart 
              data={this.state.plotData}
            />
          :
            null            
        }
        <MaterialSnackbar
          ref="snackbar"
        />
      </div>
    );
  }

  _getHist() {
    getHist((err, hist) => {
      if (err) {
        this.refs.snackbar.show('Oops! An error occurred while fetching the data');
      } else {
        this.setState({ hist });
        this.refs.snackbar.show('Historical data fetched');
        this._processData();
      }
    });

    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1000);
  }

  _processData() {
    const histData = this.state.hist;
    if (histData.length) {
      let plotData = histData.map(data => {
        let obj = {};
        let splitedData = data.split(',');
        obj['year'] = (new Date(parseInt(splitedData[0], 10))).getFullYear();
        obj['timestamp'] = parseInt(splitedData[0], 10);
        obj['close'] = parseInt(splitedData[4], 10);        
        return obj;
      }).sort(function (a, b) {
        return a.year - b.year;
      });
      this.setState({ plotData });
    }
  }
}

export default HistoricalGraphContainer;
