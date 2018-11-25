import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';
import { createStylist } from '../ApiClient';

export default class AdminAddStylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stylistName: '',
      phoneNumber: '',
      email: '',
      isAddStylistFailed: undefined,
      addStylistMsg: ''
    };
  }

  validateForm() {
    console.log(this.state)
    console.log(this.state.stylistName.length > 5);
    console.log(this.state.phoneNumber.length >= 10);
    console.log(this.state.email > 5);
    return (
      this.state.stylistName.length > 5
      && this.state.phoneNumber.length >= 10
      && this.state.email.length > 5
    );
  }

  handleChange = (event) => {
    if (this.state.isAddStylistFailed !== undefined) this.setState({ isAddStylistFailed: undefined, addStylistMsg: '' });
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  wasAddSuccessful = (stylist, message) => {
    this.setState({ isAddStylistFailed: !stylist, addStylistMsg: message });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const stylistObj = {
      stylist_name: this.state.stylistName,
      phone_number: this.state.phoneNumber,
      email: this.state.email
    };
    createStylist(stylistObj, this.wasAddSuccessful);
    this.setState({ isLoading: false });
  }

  renderAddFailure() {
    return (<div className="errorMessage">{this.state.addStylistMsg}</div>);
  }

  renderAddSuccess() {
    return (<div className="successMessage">{this.state.addStylistMsg}</div>);
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="stylistName" bsSize="large">
          <ControlLabel>Stylist Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.stylistName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="phoneNumber" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            autoFocus
            type="number"
            value={this.state.phoneNumber}
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
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Add Stylist"
          loadingText="Adding ..."
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
        {this.state.isAddStylistFailed ? (this.renderAddFailure()) : (this.renderAddSuccess())}
      </div>
    );
  }
}
