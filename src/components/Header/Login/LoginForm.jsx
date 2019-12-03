import React from 'react';
import { API_URL, API_KEY_3, fetchApi } from '../../../api/api';

export default class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      repeatpassword: '',
      errors: {
        username: null,
        password: null,
        repeatpassword: null,
      },
      submitting: false,
    };
  }

  onSubmit = () => {
    this.setState({
      submitting: true,
    });

    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token,
            }),
          },
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              request_token: data.request_token,
            }),
          },
        );
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`,
        );
      })
      .then(user => {
        this.props.updateUser(user);
        this.setState({
          submitting: false,
        });
      })
      .catch(error => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        });
      });
  };

  onChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null,
      },
    }));
  };

  validateFieds = name => {
    const errors = {};
    if (name === 'username' && this.state.username === '') {
      errors.username = 'Not empty';
    }

    if (name === 'password' && this.state.password === '') {
      errors.password = 'Not empty';
    }

    if (name === 'repeatpassword' && this.state.repeatpassword === '') {
      errors.repeatpassword = 'Not empty';
    }

    if (!this.state.username && this.state.password) {
      errors.username = 'Input username';
    }

    if (
      this.state.password &&
      this.state.repeatpassword &&
      this.state.password !== this.state.repeatpassword
    ) {
      errors.repeatpassword = 'The password does not math';
    }
    return errors;
  };

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFieds();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  handleBlur = e => {
    const name = e.target.name;
    const errors = this.validateFieds(name);
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };

  render() {
    const {
      username,
      password,
      repeatpassword,
      errors,
      submitting,
    } = this.state;

    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Login</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Login"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="repeatpassword">Repeat password</label>
            <input
              type="password"
              className="form-control"
              id="repeatpassword"
              placeholder="Repeat password"
              name="repeatpassword"
              value={repeatpassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatpassword && (
              <div className="invalid-feedback">{errors.repeatpassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}>
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
