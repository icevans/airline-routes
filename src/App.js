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
      itemOffset: 0,
      itemLimit: 25,
    };
  }

  formatValue = (property, value) => {
    return property === 'airline' ? (
      getAirlineById(value).name
    ) : (
      getAirportByCode(value).name
    );
  }

  onFirstPage = () => {
    return this.state.itemOffset === 0;
  }

  onLastPage = () => {
    const numPages = this.state.routes.length / this.state.itemLimit;
    const lastPage = Math.floor(numPages);
    const currentPage = 
      (this.state.itemOffset + this.state.itemLimit) / this.state.itemLimit;

    return currentPage === lastPage;
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
            rows={this.state.routes}
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;