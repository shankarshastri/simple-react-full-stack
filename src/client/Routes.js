import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute';
import Signup from './containers/Signup';
import Customer from './containers/Customer';
import Admin from './containers/Admin';
import CustomerBooking from './containers/CustomerAddBooking';
import CustomerCurrentBooking from './containers/CustomerCurrentBooking';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/admin" exact component={Admin} props={childProps} />
    <AppliedRoute path="/customer" exact component={Customer} props={childProps} />
    <AppliedRoute path="/customer/addBooking" exact component={CustomerBooking} props={childProps} />
    <AppliedRoute path="/customer/currentBooking" exact component={CustomerCurrentBooking} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
);
