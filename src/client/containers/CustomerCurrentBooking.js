import React, { Component } from 'react';
import './Home.css';
import { Table } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { getCustomerBooking, updateRating } from '../ApiClient';

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

  handleOnChangeRating = (stylist_rating, bookingId) => {
    const updatedBooking = this.state.bookings.map(b => (b.booking_id === bookingId ? ({ ...b, stylist_rating }) : b));
    updateRating(bookingId, stylist_rating);
    this.setState({ bookings: updatedBooking });
  }

  renderRatings(rating, bookingId) {
    const ratingValue = (rating < 0) ? 0 : rating;
    return (
      <StarRatings
        rating={ratingValue}
        starRatedColor="blue"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="5px"
        changeRating={this.handleOnChangeRating}
        name={bookingId}
      />
    );
  }

  renderRow(row) {
    return (
      <tr key={row.booking_id}>
        <td>{new Date(row.booking_date).toString()}</td>
        <td>{row.stylist_name}</td>
        <td>{row.style_name}</td>
        <td>{this.renderRatings(row.stylist_rating, row.booking_id)}</td>
      </tr>
    );
  }

  renderTable() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Booking Date</th>
            <th>Stylist Name</th>
            <th>Style Name</th>
            <th>Ratings</th>
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
