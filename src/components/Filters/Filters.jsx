import React from 'react';
import SortBy from './SortBy';
import Years from './Years';
import Pagination from './Pagination';
import Genre from './Genre';

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year, genre },
      onChangeFilters,
      onChangeGenre,
      page,
      onChangePage,
      resetValue,
      pageSize,
      totalCount,
    } = this.props;
    return (
      <React.Fragment>
        <form className="mb-3 form-filters">
          <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
          <Years year={year} onChangeFilters={onChangeFilters} />
          <Genre genre={genre} onChangeGenre={onChangeGenre} />
          <Pagination
            page={page}
            onChangePage={onChangePage}
            resetValue={resetValue}
            pageSize={pageSize}
            totalCount={totalCount}
          />
        </form>
      </React.Fragment>
    );
  }
}
