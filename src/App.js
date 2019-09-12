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
      airlineFilter: '',
      airportFilter: '',
    };
  }

  componentDidUpdate() {
    console.log(this.filteredRoutes());
  }

  formatValue = (property, value) => {
    return property === 'airline' ? (
      getAirlineById(value).name
    ) : (
      getAirportByCode(value).name
    );
  };

  filterByAirline = (event) => {
    const airlineId = event.target.value;

    this.setState({
      airlineFilter: Number(airlineId),
    });
  };

  filterByAirport = (event) => {
    const airportCode = event.target.value;

    this.setState({
      airportFilter: airportCode,
    });
  };

  filteredRoutes = () => {
    let filtered = data.routes;

    if (this.state.airlineFilter) {
      filtered = filtered.filter(route => (
        route.airline === this.state.airlineFilter
      ));
    }

    if (this.state.airportFilter) {
      filtered = filtered.filter(route => (
        route.src === this.state.airportFilter ||
          route.dest === this.state.airportFilter
      ));
    }

    return filtered;
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
            <select onChange={this.filterByAirline}>
              <option value=''>All Airlines</option>
              {data.airlines.map(airline => (
                <option value={airline.id}>{airline.name}</option>
              ))}
            </select>

            <label>flying in or out of</label>
            <select onChange={this.filterByAirport}>
              <option value=''>All Airports</option>
              {data.airports.map(airport => (
                <option value={airport.code}>{airport.name}</option>
              ))}
            </select>
          </form>
          <Table
            columns={columns}
            className='routes-table'
            rows={this.filteredRoutes()}
            format={this.formatValue}
            rowsPerPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;