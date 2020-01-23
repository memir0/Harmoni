//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Link } from 'react-router-dom';

type State = {
  status: boolean,
  userType: String,
  show: Boolean,
};

export default class Menu extends Component<{}, { status: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: localStorage.getItem('token') === null,
      show: true,
      userType: localStorage.getItem('userType'),
    };
  }

  render() {
    return (
      <nav className="navbar menu navbar-dark bg-dark">
        <a className="navbar-brand text-light" id="title" href="/">
          HARMONI
        </a>
        <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        {this.state.status ? (
          <form className="loginGroup">
            <a className="nav-link text-light" id="homeButton" href="/">
              Hjem <i className="fa fa-home fa-lg"></i>
              <span className="sr-only"></span>
            </a>
            <a className="nav-link text-light text-right" id="loginButton" href="/login">
              Logg inn{' '}
              <i className="fa fa-sign-in fa-lg" style={{ color: 'white' }} aria-hidden="true"></i>
              <span className="sr-only"></span>
            </a>
          </form>
        ) : (
          <div className="loginGroup" id="toggler-div">
            <button class="navbar-toggler" type="button" onClick={() => this.collapse()}>
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        )}
        {this.state.status ? (
          <div></div>
        ) : (
          <form id="navbarSupportedContent" className="loginGroup">
            <a className="nav-link text-light" id="homeButton" href="/">
              Hjem <i className="fa fa-home fa-lg"></i>
              <span className="sr-only"></span>
            </a>
            {this.state.userType == 'organiser' ? (
              <a className="nav-link text-light" id="eventButton" href="/newevent">
                Opprett arrangement <i className="fa fa-plus-circle fa-lg"></i>
                <span className="sr-only"></span>
              </a>
            ) : (
              <div></div>
            )}
            <a className="nav-link text-light" id="profileButton" href="/profile">
              Profil <i className="fa fa-user fa-lg"></i>
              <span className="sr-only"></span>
            </a>
            <a className="nav-link text-light" id="loginButton" onClick={() => this.logOut()}>
              Logg ut{' '}
              <i className="fa fa-sign-out fa-lg" style={{ color: 'white' }} aria-hidden="true"></i>
              <span className="sr-only"></span>
            </a>
          </form>
        )}
      </nav>
    );
  }

  componentDidMount() {
    if (window.screen.availWidth > 600) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location.href = '/';
  }
  collapse() {
    let x = document.getElementById('navbarSupportedContent');
    let y = document.getElementById('navbarContent');
    if (this.state.show) {
      x.style.display = 'block';
      this.setState({ show: false });
    } else {
      x.style.display = 'none';
      this.setState({ show: true });
    }
  }
}
