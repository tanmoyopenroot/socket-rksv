import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const StockMaterialTable = (props) => {
  const stockTableData = props.stockTableData;
  return (
    stockTableData.map((data, index) => {
      return (
        <TableRow
          key={index}
          style={{
            background: data.new ? '#00bdd64a' : 'inherit'
          }}>      
          <TableRowColumn>{data.year}</TableRowColumn>
          <TableRowColumn>{data.open}</TableRowColumn>
          <TableRowColumn>{data.high}</TableRowColumn>
          <TableRowColumn>{data.low}</TableRowColumn>
          <TableRowColumn>{data.close}</TableRowColumn>
          <TableRowColumn>{data.volume}</TableRowColumn>
        </TableRow>
      );
    })
  );
};

StockMaterialTable.prototype = {
  stockTableData: PropTypes.array
}

export default StockMaterialTable;
