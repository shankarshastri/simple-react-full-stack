import React, { Component } from 'react';
import './Home.css';
import { Table } from 'react-bootstrap';
import { getCustomerBooking } from '../ApiClient';

export default class CustomerCurrentBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      bookings: []
    };
  }

  componentDidMount() {
    getCustomerBooking(this.state.userName, this.setBookings);
  }

  setBookings = (bookings) => {
    if (bookings.length > 0) {
      this.setState({ bookings });
    }
  }

  renderRow(row) {
    return (
      <tr key={row.booking_id}>
        <td>{row.booking_id}</td>
        <td>{row.booking_date}</td>
        <td>{row.stylist_name}</td>
        <td>{row.style_name}</td>
        <td>{row.stylist_rating}</td>
      </tr>
    );
  }

  renderTable() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Booking Date</th>
            <th>Stylist Name</th>
            <th>Style Name</th>
            <th>Ratings </th>
          </tr>
        </thead>
        <tbody>
          {this.state.bookings.map(row => (this.renderRow(row)))}
        </tbody>
      </Table>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="Home">
        {this.renderTable()}
      </div>
    );
  }
}
