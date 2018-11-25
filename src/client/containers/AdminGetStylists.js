import React, { Component } from 'react';
import './Home.css';
import { Table } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { getStylists } from '../ApiClient';

export default class AdminGetStylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stylistList: []
    };
  }

  updateStylistList = (json) => {
    this.setState({ stylistList: json });
  }

  componentDidMount() {
    getStylists(this.updateStylistList);
  }

  renderRatings(rating, stylist_name) {
    const ratingValue = (rating < 0) ? 0 : rating;
    return (
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="5px"
        name={stylist_name}
      />
    );
  }

  renderRow(row) {
    return (
      <tr key={row.stylist_name}>
        <td>{row.stylist_name}</td>
        <td>{row.phone_number}</td>
        <td>{row.email}</td>
        <td>{this.renderRatings(row.avg_rating, row.stylist_name)}</td>
      </tr>
    );
  }

  renderTable() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Stylist Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {this.state.stylistList.map(row => (this.renderRow(row)))}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderTable()}
      </div>
    );
  }
}
