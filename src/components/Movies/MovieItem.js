import React from 'react';
import defaultImg from '../../img/default-img.png';

export default class MovieItem extends React.Component {
  getOverviewContext = overview => {
    const number = 210;
    if (overview.length > number) {
      return <p className="clip">{overview.slice(0, number) + '...'}</p>;
    } else {
      return <p className="clip">{overview}</p>;
    }
  };

  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: '100%' }}>
        <img
          className="card-img-top card-img--height"
          src={item.backdrop_path && item.poster_path ? `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}` : (defaultImg)}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <span className="release-date">{item.release_date}</span>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="overview">
            {this.getOverviewContext(item.overview)}
          </div>
          <p className="view_more">
            <a id="" className="result" href="">
              More Info
            </a>
          </p>
        </div>
      </div>
    );
  }
}
