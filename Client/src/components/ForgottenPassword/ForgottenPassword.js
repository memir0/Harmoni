//@flow

import React, { Component } from 'react';
import { PublicService } from '../../services/publicService.js';
import './stylesheet.css';

/**
 * Component for changing a forgotten password
 */
export default class ForgottenPassword extends Component<{}, { email: string }> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="card passwordcard mb-4">
        <p className="display-4 text-uppercase text-center m-4 border-bottom">GLEMT PASSORD</p>
        <form onSubmit={e => this.newPassword(e)}>
          <div class="form-group text-center ml-5 mr-5">
            <label for="inputEmail1">Din epost-adresse:</label>
            <p id="alert" style={{ color: 'red' }} hidden="true">
              Bruker eksisterer ikke
            </p>
            <input
              type="email"
              onChange={e => this.changeEmail(e)}
              name="email"
              class="form-control"
              id="inputEmail1"
              aria-describedby="emailHelp"
              placeholder="Skriv e-post"
              required
            ></input>
          </div>
          <div class="form-group text-center ml-5 mr-5">
            <button type="submit" class="btn btn-success mr-3 ml-3">
              Send passord
            </button>
          </div>
        </form>
      </div>
    );
  }

  /**
   * Sets the state of email
   * @param e the input element
   */
  changeEmail(e: any) {
    const target = e.target;
    let value: string = target.value;
    this.setState({ email: value });
  }

  /**
   * Notifies the server to generate a new password, and the notfies the user via mail.
   * @param e the input element.
   */
  newPassword(e: any) {
    // $FlowFixMe
    document.getElementById('alert').hidden = true;
    e.preventDefault();
    //Checks email to see if it exists
    PublicService.checkEmail(this.state.email)
      .then(response => {
        if (response.data.length === 0) {
          // $FlowFixMe
          document.getElementById('alert').hidden = false;
        } else {
          //Generates random passord and sends an email
          PublicService.newPassword(this.state.email, response.data[0].type)
            .then(response => {
              window.location = '/passwordregister';
            })
            .catch(error => {});
        }
      })
      .catch(error => {});
  }
}
