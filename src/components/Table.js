import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowOffset: 0,
    }
  }

  onFirstPage = () => {
    return this.state.rowOffset === 0;
  }

  numRows = () => {
    return this.props.rows.length;
  }

  pageLowBound = () => {
    return this.state.rowOffset + 1;
  }

  pageUpBound = () => {
    return this.state.rowOffset + 25;
  }

  onLastPage = () => {
    const numPages = this.props.rows.length / this.props.rowsPerPage;
    const lastPage = Math.floor(numPages);
    const currentPage = 
      (this.state.rowOffset + this.props.rowsPerPage) / this.props.rowsPerPage;

    return currentPage === lastPage;
  }

  goToNextPage = () => {
    this.setState(prevState => (
      {rowOffset: prevState.rowOffset + this.props.rowsPerPage}
    ));
  }

  rowsForCurrentPage = () => {
    return this.props.rows.slice(
      this.state.rowOffset,
      this.state.rowOffset +this.props.rowsPerPage
    );
  }

  goToPrevPage = () => {
    this.setState(prevState => (
      {rowOffset: prevState.rowOffset - this.props.rowsPerPage}
    ));
  }

  render() {
    return (
      <table className='routes-table'>
        <caption className='pagination' align='bottom'>
          <p>
            Showing rows {this.pageLowBound()} - {this.pageUpBound()} of {this.numRows()}
          </p>
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
          {this.rowsForCurrentPage().map(row => (
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
