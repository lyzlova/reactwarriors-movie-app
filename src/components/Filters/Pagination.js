import React from 'react';

export default class Pagination extends React.Component {
  render() {
    const { page, onChangePage, resetValue, pageSize, totalCount } = this.props;

    return (
      <React.Fragment>
        <div className="btn-group btn-group-style">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}>
            Previous
          </button>
          <span className="btn">
            {page} of {totalCount}
          </span>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePage.bind(null, page + 1)}>
            Next
          </button>
        </div>
        <button
          type="reset"
          className="btn btn-primary btn-reset"
          onClick={resetValue}>
          Reset value
        </button>
      </React.Fragment>
    );
  }
}
