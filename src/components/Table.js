import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemOffset: 0,
    }
  }

  onFirstPage = () => {
    return this.state.itemOffset === 0;
  }

  onLastPage = () => {
    const numPages = this.props.rows.length / this.props.itemLimit;
    const lastPage = Math.floor(numPages);
    const currentPage = 
      (this.state.itemOffset + this.props.itemLimit) / this.props.itemLimit;

    return currentPage === lastPage;
  }

  goToNextPage = () => {
    this.setState(prevState => (
      {itemOffset: prevState.itemOffset + this.props.itemLimit}
    ));
  }

  goToPrevPage = () => {
    this.setState(prevState => (
      {itemOffset: prevState.itemOffset - this.props.itemLimit}
    ));
  }

  render() {
    return (
      <table className='routes-table'>
        <caption className='pagination' align='bottom'>
          <p>
            <button
              onClick={this.goToPrevPage}
              disabled={this.onFirstPage()}
            >
              Previous Page
            </button>
            <button
              onClick={this.goToNextPage}
              disabled={this.onLastPage()}
            >
              Next Page
            </button>
          </p>
        </caption>

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
