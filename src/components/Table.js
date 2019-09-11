import React from 'react';

class Table extends React.Component {

  render() {
    console.log(this.props)
    return (
      <table className='routes-table'>
        <thead>
          <tr>
            {this.props.columns.map(column => (
              <th>{column.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {this.props.routes.map(route => (
            <tr key={route.airline + route.src + route.dest}>
              {this.props.columns.map(column => (
                <td>
                  {column.property === 'airline' ? (
                    this.props.getAirlineById(route[column.property]).name
                  ) : (
                    this.props.getAirportByCode(route[column.property]).name
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
