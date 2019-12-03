import React from 'react';
import logoutImg from '../../../img/png/logout.png';

export default class User extends React.Component {
  render() {
    const { user, logout } = this.props;
    return (
      <div className="d-flex align-items-center">
        <img
          width="40"
          height="40"
          className="rounded-circle"
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=40"`}
          alt=""
        />
        <img className="logout" srcSet={logoutImg} alt="logout" onClick={logout} />
      </div>
    );
  }
}
