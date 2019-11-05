import React from 'react';

export default class Years extends React.Component {
  render() {
    const { year, onChangeFilters } = this.props;
    const getYears = new Date().getFullYear();
    const allYears = [];

    for (let i = getYears; i !== 1899; i -= 1) {
      allYears.push(i);
    }

    return (
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <select
          className="form-control"
          id="year"
          name="year"
          value={year}
          onChange={onChangeFilters}>
          {allYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
