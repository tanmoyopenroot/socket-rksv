import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const StockMaterialTable = (props) => {
  const stockTableData = props.stockTableData;
  return (
    <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Time</TableHeaderColumn>
          <TableHeaderColumn>Open</TableHeaderColumn>
          <TableHeaderColumn>High</TableHeaderColumn>
          <TableHeaderColumn>Low</TableHeaderColumn>
          <TableHeaderColumn>Close</TableHeaderColumn>
          <TableHeaderColumn>Volume</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
      {
        stockTableData.map((data, index) => {
          return (
            <TableRow key={index}>
              <TableRowColumn>{data.year}</TableRowColumn>
              <TableRowColumn>{data.open}</TableRowColumn>
              <TableRowColumn>{data.high}</TableRowColumn>
              <TableRowColumn>{data.low}</TableRowColumn>
              <TableRowColumn>{data.close}</TableRowColumn>
              <TableRowColumn>{data.volume}</TableRowColumn>
            </TableRow>
          );
        })
      }
      </TableBody>
    </Table>
  );
};

StockMaterialTable.prototype = {
  stockTableData: PropTypes.array
}

export default StockMaterialTable;
