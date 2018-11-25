import React, { Component } from 'react';
import './Home.css';
import { Table } from 'react-bootstrap';
import { getStyles } from '../ApiClient';

export default class AdminGetStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleList: []
    };
  }

  updateStyleList = (json) => {
    this.setState({ styleList: json });
  }

  componentDidMount() {
    getStyles(this.updateStyleList);
  }

  renderRow(row) {
    return (
      <tr key={row.style_name}>
        <td>{row.style_name}</td>
        <td>{row.duration}</td>
        <td>{row.rates}</td>
      </tr>
    );
  }

  renderTable() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Style Name</th>
            <th>Duration</th>
            <th>Rates</th>
          </tr>
        </thead>
        <tbody>
          {this.state.styleList.map(row => (this.renderRow(row)))}
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
