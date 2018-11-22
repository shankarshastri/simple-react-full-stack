import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './app.css';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from './Routes';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAdmin: false,
      userName: ''
    };
  }

userHasAuthenticated = (json, props, name) => {
  this.setState({
    isAuthenticated: json.isAuthenticated || false,
    isAdmin: json.isAdmin || false,
    userName: name || ''
  });
  if (json.isAuthenticated) {
    return (json.isAdmin) ? props.history.push('/admin') : props.history.push('/customer');
  }
}

handleLogout = (event, props) => {
  const json = { isAuthenticated: false, isAdmin: false };
  this.userHasAuthenticated(json, props);
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
            {this.state.isAuthenticated
              ? <NavItem onClick={event => this.handleLogout(event, this.props)}>Logout</NavItem>
              : (
                <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              )
  }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
    </div>
  );
}
}
export default withRouter(App);
