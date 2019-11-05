import React from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MovieList';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: 'popularity.desc',
        year: 2019,
        genre: '',
      },
      page: 1,
      pageSize: 20,
      totalCount: 10000,
    };
  }

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value,
    };

    this.setState({
      filters: newFilters,
    });
  };

  onChangePage = page => {
    this.setState({
      page,
    });
  };

  resetValue = () => {
    this.setState({
      filters: {
        sort_by: 'popularity.desc',
        year: 2019,
        genre: '',
      },
      page: 1,
      pageSize: 20,
      totalCount: 10000,
    });
    const listGenres = document.getElementById('checkbox');
    const optionGenres = document.getElementById('option-genres');
    listGenres.style.display = 'none';
    optionGenres.style.display = 'block';
  };

  render() {
    const { filters, page, pageSize, totalCount } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  resetValue={this.resetValue}
                  pageSize={pageSize}
                  totalCount={totalCount}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              page={page}
              filters={filters}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
