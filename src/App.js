import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      endpoint: 'http://kaboom.rksv.net/watch'
    });
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('sub',{ state: true });      
    socket.on('connect', () => {
      console.log('connected');
    });
    
    socket.on('data', (data, cb) => {
      cb(1);
      console.log(data);
    });      

    return (
      <div>
        socket
      </div>
    );
  }
}

export default App;
