import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  linearGradient
} from 'recharts';
import MaterialDiv from './MaterialDiv';

const HistoricalAreaChart = (props) => {
  const data = props.data;
  const styleContainer = {
    fontSize: '11px'
  }
  return (    
    <MaterialDiv style={styleContainer}>
      <AreaChart
        width={950}
        height={350}
        data={data}
        margin={{ top: 40, right: 20, left: 20, bottom: 30 }}>
        <defs>
          <linearGradient 
            id="colorUv" 
            x1="0" 
            y1="0" 
            x2="0" 
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#8884d8"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#8884d8"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey="year"
          label={{ 
            value: 'Year',
            position: 'bottom'
          }}
        />
        <YAxis
          label={{
            value: 'Close Value',
            angle: -90,
            position: 'insideLeft'
          }}
        />
        <Tooltip/>
        <Area 
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </MaterialDiv>
  );
}

HistoricalAreaChart.propTypes = {
  data: PropTypes.array
}

export default HistoricalAreaChart;
