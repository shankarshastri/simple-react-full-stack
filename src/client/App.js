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
      isAdmin: false
    };
  }

userHasAuthenticated = (json, props) => {
  this.setState({
    isAuthenticated: json.isAuthenticated || false,
    isAdmin: json.isadmin || false
  });
  if (json.isAuthenticated) {
    props.history.push('/');
  }
}

handleLogout = (event, props) => {
  const json = { isAuthenticated: false, isAdmin: false };
  this.userHasAuthenticated(json, props);
  props.history.push('/login');
}

render() {
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated
  };

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Hair Salon</Link>
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
