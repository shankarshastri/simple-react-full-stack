import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './app.css';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from './Routes';

export class App extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(window.sessionStorage.getItem('userSession'));
    if (session !== null) {
      this.state = {
        isAuthenticated: session.isAuthenticated,
        isAdmin: session.isAdmin,
        userName: session.userName
      };
    } else {
      this.state = {
        isAuthenticated: false,
        isAdmin: false,
        userName: ''
      };
    }
  }

  componentDidMount() {
    // TODO Add OnBeforeUnload
  }

userHasAuthenticated = (json, props, name) => {
  const session = {
    isAuthenticated: json.isAuthenticated || false,
    isAdmin: json.isAdmin || false,
    userName: name || ''
  };
  this.setState(session);
  window.sessionStorage.setItem('userSession', JSON.stringify(session));
  if (json.isAuthenticated) {
    return (json.isAdmin) ? props.history.push('/admin') : props.history.push('/customer');
  }
}

renderButtonsForCustomer() {
  return (
    <Fragment>
      <LinkContainer to="/customer/addBooking">
        <NavItem>Add New Booking</NavItem>
      </LinkContainer>
      <LinkContainer to="/customer/currentBooking">
        <NavItem>Booking History</NavItem>
      </LinkContainer>
      <NavItem onClick={event => this.handleLogout(event, this.props)}>Logout</NavItem>
    </Fragment>
  );
}

renderButtonForAdmin() {
  return (
    <Fragment>
      <LinkContainer to="/admin/stylist">
        <NavItem>Add Stylists</NavItem>
      </LinkContainer>
      <LinkContainer to="/admin/styles">
        <NavItem>Add Styles</NavItem>
      </LinkContainer>
      <NavItem onClick={event => this.handleLogout(event, this.props)}>Logout</NavItem>
    </Fragment>
  );
}

renderNavButtonOnAuth() {
  return (this.state.isAdmin) ? this.renderButtonForAdmin() : this.renderButtonsForCustomer();
}

renderButtonsOnLogin() {
  return (this.state.isAuthenticated
    ? this.renderNavButtonOnAuth()
    : (
      <Fragment>
        <LinkContainer to="/signup">
          <NavItem>Signup</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
      </Fragment>));
}

handleLogout = (event, props) => {
  const json = { isAuthenticated: false, isAdmin: false };
  this.userHasAuthenticated(json, props);
  window.sessionStorage.removeItem('userSession');
  props.history.push('/login');
}

renderHeaderText = () => {
  if (this.state.isAuthenticated) {
    return (this.state.isAdmin) ? 'Admin Dashboard' : 'Customer Dashboard';
  }
  return 'Hair Salon';
}

getLinkPath() {
  if (this.state.isAuthenticated) {
    return (this.state.isAdmin) ? '/admin' : '/customer';
  }
  return '/';
}

render() {
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated,
    userName: this.state.userName
  };

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={this.getLinkPath()}>{this.renderHeaderText()}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.renderButtonsOnLogin()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
    </div>
  );
}
}
export default withRouter(App);
