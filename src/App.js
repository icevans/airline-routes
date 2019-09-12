import React, { Component } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';
import Select from './components/Select';
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
      airlineFilter: airlineId && Number(airlineId),
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

    if (this.state.airlineFilter !== '') {
      filtered = filtered.filter(route => (
        route.airline === this.state.airlineFilter
      ));
    }

    if (this.state.airportFilter !== '') {
      filtered = filtered.filter(route => (
        route.src === this.state.airportFilter ||
          route.dest === this.state.airportFilter
      ));
    }

    return filtered;
  }
  
  filteredAirlines = () => {
    return data.airlines.filter(airline => (
      this.filteredRoutes().some(route => {
        return route.airline === airline.id
      })
    ))
  }

  filteredAirports = () => {
    return data.airports.filter(airport => (
      this.filteredRoutes().some(route => (
        route.src === airport.code || route.dest === airport.code
      ))
    ));
  }

  clearFilters = (event) => {
    event && event.preventDefault();

    this.setState({
      airlineFilter: '',
      airportFilter: '',
    });
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
          <svg className="map" viewBox="-180 -90 360 180">
            <g transform="scale(1 -1)">
              <image 
                xlinkHref="equirectangular_world.jpg" 
                href="equirectangular_world.jpg" 
                x="-180" y="-90" 
                height="100%" 
                width="100%" 
                transform="scale(1 -1)"
              />

              {this.filteredRoutes().map(route => (
                <g key="">
                  <circle 
                    className="source" 
                    cx={getAirportByCode(route.src).long} 
                    cy={getAirportByCode(route.src).lat}>
                    <title></title>
                  </circle> 
                  <circle 
                    className="destination" 
                    cx={getAirportByCode(route.dest).long} 
                    cy={getAirportByCode(route.dest).lat}>
                    <title></title>
                  </circle>
                  <path 
                    d={
                      `M${getAirportByCode(route.src).long} ${getAirportByCode(route.src).lat} L ${getAirportByCode(route.dest).long} ${getAirportByCode(route.dest).lat}`
                    }
                  />
                </g>
              ))}
            </g>
          </svg>
        </section>

        <section>
          <form>
            <label>Show routes on</label>
            <Select 
              onChange={this.filterByAirline}
              value={this.state.airlineFilter}
              options={this.filteredAirlines()}
              allTitle='All Airlines'
              valueKey='id'
              titleKey='name'
            />

            <label>flying in or out of</label>
            <Select 
              onChange={this.filterByAirport}
              value={this.state.airportFilter}
              options={this.filteredAirports()}
              allTitle='All Airports'
              valueKey='code'
              titleKey='name'
            />

            <button onClick={this.clearFilters}>
              Show All Routes
            </button>
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