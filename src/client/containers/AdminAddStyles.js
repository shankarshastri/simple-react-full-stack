import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';
import { createStyle } from '../ApiClient';

export default class AdminAddStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleName: '',
      duration: '',
      rates: '',
      isAddStyleFailed: undefined,
      addStyleMsg: ''
    };
  }

  validateForm() {
    return (
      this.state.styleName.length > 5
      && this.state.duration.length > 0
      && this.state.rates.length > 1
    );
  }

  handleChange = (event) => {
    if (this.state.isAddStyleFailed !== undefined) this.setState({ isAddStyleFailed: undefined, addStyleMsg: '' });
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  wasAddSuccessful = (stylist, message) => {
    this.setState({ isAddStyleFailed: !stylist, addStyleMsg: message });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const styleObj = {
      style_name: this.state.styleName,
      duration: this.state.duration,
      rates: this.state.rates
    };
    createStyle(styleObj, this.wasAddSuccessful);
    this.setState({ isLoading: false });
  }

  renderAddFailure() {
    return (<div className="errorMessage">{this.state.addStyleMsg}</div>);
  }

  renderAddSuccess() {
    return (<div className="successMessage">{this.state.addStyleMsg}</div>);
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="styleName" bsSize="large">
          <ControlLabel>Style Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.styleName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="duration" bsSize="large">
          <ControlLabel>Duration</ControlLabel>
          <FormControl
            autoFocus
            type="number"
            value={this.state.duration}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="rates" bsSize="large">
          <ControlLabel>Rate</ControlLabel>
          <FormControl
            autoFocus
            type="number"
            value={this.state.rates}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Add Style"
          loadingText="Adding ..."
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
        {this.state.isAddStyleFailed ? (this.renderAddFailure()) : (this.renderAddSuccess())}
      </div>
    );
  }
}
