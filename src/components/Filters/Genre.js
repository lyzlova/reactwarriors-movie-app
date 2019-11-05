import React from 'react';
import { API_URL, API_KEY_3 } from '../../api/api';

export default class Genre extends React.Component {
  constructor() {
    super();

    this.state = {
      genreMovies: [],
    };
  }

  getGenreMovies = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=en-US`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genreMovies: data.genres,
        });
      });
  };

  componentDidMount() {
    this.getGenreMovies();
  }

  onClickGenre = event => {
    const listGenres = document.getElementById('checkbox');
    const optionGenres = document.getElementById('option-genres');
    listGenres.style.display = 'block';
    optionGenres.style.display = 'none';
  };

  render() {
    const { genre, onChangeFilters } = this.props;
    return (
      <React.Fragment>
        <div className="form-group">
          <div
            id="genre"
            name="genre"
            value={genre}
            onChange={onChangeFilters}
            onClick={this.onClickGenre}>
            <label htmlFor="genre">Genres</label>
            <div className="form-control form-genres">
              <option id="option-genres" value="">
                Filter by genres...
              </option>
              <div id="checkbox" className="checkbox">
                {this.state.genreMovies.map(item => {
                  return (
                    <div className="block-genres" key={item.id}>
                      <input
                        className="input-genres"
                        type="checkbox"
                        id={item.id}
                        value={item.id}
                        name="genre"
                      />
                      <label
                        className="label-genres"
                        htmlFor={item.id}
                        value={item.id}>
                        {item.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
