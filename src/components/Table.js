import React from 'react';

class Table extends React.Component {

  render() {
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
          {this.props.rows.map(row => (
            <tr key={Object.values(row).join('-')}>
              {this.props.columns.map(column => (
                <td>
                  {this.props.format(
                    column.property, 
                    row[column.property]
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
