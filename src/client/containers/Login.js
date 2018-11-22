import React, { Component } from 'react';
import {
  FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Login.css';
import { login } from '../ApiClient';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: ''
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  errorHandler = (message) => {
    this.setState({ errorMessage: message });
  }

  handleSubmit(event, props) {
    event.preventDefault();
    this.setState({ errorMessage: '' });
    this.setState({ isLoading: true });
    login(this.state.username, this.state.password, props, this.errorHandler);
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={event => this.handleSubmit(event, this.props)}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
        <div className="errorMessage">{this.state.errorMessage}</div>
      </div>
    );
  }
}
