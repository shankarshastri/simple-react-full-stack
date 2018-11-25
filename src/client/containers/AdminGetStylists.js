import React, { Component } from 'react';
import './Home.css';
import { Table } from 'react-bootstrap';
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

  renderRow(row) {
    return (
      <tr key={row.stylist_name}>
        <td>{row.stylist_name}</td>
        <td>{row.phone_number}</td>
        <td>{row.email}</td>
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
