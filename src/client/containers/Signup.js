import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';
import { createCustomer } from '../ApiClient';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fname: '',
      lname: '',
      email: '',
      user_name: '',
      password: '',
      confirmPassword: '',
      isSignUpFailed: undefined,
      signupMessage: ''
    };
  }

  validateForm() {
    return (
      this.state.fname.length > 5
      && this.state.lname.length > 1
      && this.state.email.length > 5
      && this.state.user_name.length > 5
      && this.state.password.length > 6
      && this.state.password === this.state.confirmPassword
    );
  }

  handleChange = (event) => {
    if (this.state.isSignUpFailed !== undefined) this.setState({ isSignUpFailed: undefined, signupMessage: ''});
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  wasSignUpSuccessful = (signUp, message) => {
    this.setState({ isSignUpFailed: !signUp , signupMessage: message});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const customerObj = {
      fname: this.state.fname,
      lname: this.state.lname,
      password: this.state.password,
      email: this.state.email,
      user_name: this.state.user_name
    };
    createCustomer(customerObj, this.wasSignUpSuccessful);
    this.setState({ isLoading: false });
  }

  renderSignUpFailure() {
    return (<div className="errorMessage">{this.state.signupMessage}</div>);
  }

  renderSignUpSuccess() {
    return (<div className="successMessage">{this.state.signupMessage}</div>);
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="fname" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.fname}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="lname" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.lname}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="user_name" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.user_name}
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
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
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
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
        {this.state.isSignUpFailed ? (this.renderSignUpFailure()) : (this.renderSignUpSuccess())}
      </div>
    );
  }
}
