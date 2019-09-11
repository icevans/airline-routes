import React, { Component } from 'react';
import './App.css';
import data from './data';
import {getAirlineById} from './data'
import {getAirportByCode} from './data'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: data.routes,
    };
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>

        <section>
          <table class='routes-table'>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source Airport</th>
                <th>Destination Airport</th>
              </tr>
            </thead>

            <tbody>
              {this.state.routes.map(route => (
                <tr key={route.airline + route.src + route.dest}>
                  <td>{route.airline}</td>
                  <td>{route.src}</td>
                  <td>{route.dest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;