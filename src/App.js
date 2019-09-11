import React, { Component } from 'react';
import './App.css';
import data from './data';

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
            
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;