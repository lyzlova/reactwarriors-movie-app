import React from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MovieList';
import Header from './Header/Header';

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
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="card-body">
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
          <MoviesList
            page={page}
            filters={filters}
            onChangePage={this.onChangePage}
          />
        </div>
      </React.Fragment>
    );
  }
}
