import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <table className='routes-table'>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source Airport</th>
            <th>Destination Airport</th>
          </tr>
        </thead>

        <tbody>
          {this.props.routes.map(route => (
            <tr key={route.airline + route.src + route.dest}>
              <td>{this.props.getAirlineById(route.airline).name}</td>
              <td>{this.props.getAirportByCode(route.src).name}</td>
              <td>{this.props.getAirportByCode(route.dest).name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
