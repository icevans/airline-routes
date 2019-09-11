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

  formatValue = (property, value) => {
    return property === 'airline' ? (
      getAirlineById(value).name
    ) : (
      getAirportByCode(value).name
    );
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
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
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;