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
      page,
      onChangePage,
      resetValue,
      pageSize,
      totalCount,
    } = this.props;
    return (
      <div className="form-filters">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <Years year={year} onChangeFilters={onChangeFilters} />
        <Genre genre={genre} onChangeFilters={onChangeFilters} />
        <Pagination
          page={page}
          onChangePage={onChangePage}
          resetValue={resetValue}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    );
  }
}
