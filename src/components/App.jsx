import React from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MovieList';
import Header from './Header/Header';
import { API_URL, API_KEY_3, fetchApi } from '../api/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
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

  updateUser = user => {
    this.setState({
      user,
    });
  };

  logout = () => {
    this.setState({
      user: null,
      session_id: null,
    });
  };

  updateSessionId = session_id => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  logout = () => {
    const session_id = cookies.get('session_id');
    fetchApi(
      `${API_URL}/authentication/session?api_key=${API_KEY_3}&session_id=${session_id}`,
      {
        method: 'DELETE',
      },
    )
      .then(
        this.setState({
          user: null,
          session_id: null,
        }),
        cookies.remove('session_id', { path: '' }),
      )
      .catch(() => console.log('error'));
  };

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value,
    };

    this.setState({
      filters: newFilters,
    });
  };

  onChangeGenre = event => {
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

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`,
      ).then(user => {
        this.updateUser(user);
      });
    } else {
      return null;
    }
  }

  render() {
    const { filters, page, pageSize, totalCount, user } = this.state;
    return (
      <React.Fragment>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
          logout={this.logout}
        />
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
                    onChangeGenre={this.onChangeGenre}
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
      </React.Fragment>
    );
  }
}
