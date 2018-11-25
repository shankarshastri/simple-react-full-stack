import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';
import { getStyles, getStylists, createBooking } from '../ApiClient';

export default class CustomerAddBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stylistName: '',
      styleName: '',
      userName: this.props.userName,
      bookingDate: new Date(),
      stylistList: [],
      styleList: [],
      isBookingFailed: undefined,
      bookingMsg: ''
    };
  }

  setStylistList = (stylists) => {
    if (stylists.length > 0) {
      this.setState({ stylistList: stylists });
    }
  }

  setStyleList = (styles) => {
    if (styles.length > 0) {
      this.setState({ styleList: styles });
    }
  }

  componentDidMount() {
    getStyles(this.setStyleList);
    getStylists(this.setStylistList);
  }

  validateForm() {
    return (
      this.state.stylistName.length > 5
      && this.state.styleName.length > 1
      && this.state.bookingDate !== undefined
    );
  }

  handleChange = (event) => {
    if (this.state.isBookingFailed !== undefined) this.setState({ isBookingFailed: undefined, bookingMsg: '' });
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeForDate = (e) => {
    if (e != null) {
      this.setState({ bookingDate: e.toString() });
    }
  }

  wasBookingSuccessful = (booking, message) => {
    this.setState({ isBookingFailed: !booking, bookingMsg: message });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const customerObj = {
      user_name: this.state.userName,
      stylist_name: this.state.stylistName,
      style_name: this.state.styleName,
      booking_date: this.state.bookingDate,
    };
    createBooking(customerObj, this.wasBookingSuccessful);
    this.setState({ isLoading: false });
  }

  renderBookingFailed() {
    return (<div className="errorMessage">{this.state.bookingMsg}</div>);
  }

  renderBookingSuccess() {
    return (<div className="successMessage">{this.state.bookingMsg}</div>);
  }

  renderStylistOption() {
    return (
      this.state.stylistList.map(e => <option key={e.stylist_name} value={e.stylist_name}>{e.stylist_name}</option>)
    );
  }

  getStyleValue(s) {
    return `${s.style_name} rate:${s.rates} duration: ${s.duration}`;
  }

  renderStyleOption() {
    return (
      this.state.styleList.map(e => <option key={e.style_name} value={e.style_name}>{this.getStyleValue(e)}</option>)
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="stylistName" bsSize="large">
          <ControlLabel>Stylist Name</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            defaultValue={this.state.stylistName}
            onChange={this.handleChange}
          >
            <option value="">select</option>
            {this.renderStylistOption()}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="styleName" bsSize="large">
          <ControlLabel>Style Name</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            defaultValue={this.state.styleName}
            onChange={this.handleChange}
          >
            <option value="">select</option>
            {this.renderStyleOption()}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="bookingDate" bsSize="large">
          <ControlLabel>Booking Date</ControlLabel>
          <div>
            <DateTimePicker onChange={this.handleChangeForDate} value={new Date(this.state.bookingDate)} />
          </div>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Confirm Booking"
          loadingText="Booking ..."
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
        {this.state.isBookingFailed ? (this.renderBookingFailed()) : (this.renderBookingSuccess())}
      </div>
    );
  }
}
