import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import data from './data';
import {getAirlineById} from './data';
import {getAirportByCode} from './data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: data.routes,
    };
  }

  render() {
    const columns = [
      'Airline',
      'Source Airport',
      'Destination Airport',
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>

        <section>
          <Table
            columns={columns}
            className='routes-table'
            routes={this.state.routes}
            getAirlineById={getAirlineById}
            getAirportByCode={getAirportByCode}
          />
        </section>
      </div>
    );
  }
}

export default App;