/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../Auth/Auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/"><sup>PIN</sup> | <sub>TERST</sub></a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {
              authed
                ? <button className="nav-link btn btn-danger text-dark logout-button" onClick={this.logoutClickEvent}><i className="fas fa-sign-out-alt"></i> Logout <i className="fas fa-sign-out-alt"></i></button>
                : <Auth />
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default MyNavbar;
