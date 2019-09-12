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
          <form>
            <label>Show routes on</label>
            <select>
              <option value=''>All Airlines</option>
              {data.airlines.map(airline => (
                <option value={airline.id}>{airline.name}</option>
              ))}
            </select>

            <label>flying in or out of</label>
            <select>
              <option value=''>All Airports</option>
              {data.airports.map(airport => (
                <option value={airport.code}>{airport.name}</option>
              ))}
            </select>
          </form>
          <Table
            columns={columns}
            className='routes-table'
            rows={this.state.routes}
            format={this.formatValue}
            rowsPerPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;