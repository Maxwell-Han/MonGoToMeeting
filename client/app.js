import React, { useState, useReducer, createContext, useEffect } from "react";
import { me } from "./store"
import LoginForm from "./LoginForm";
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import {SignUp, Login, Layout, Landing} from './components'
import Home from './home'

export const DispatchContext = createContext(null);

const App = (props) => {
  useEffect(() => {
    props.loadInitialData();
  }, []);
  const { isLoggedIn } = props;
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      {/* <Route path="/signup" component={SignUp} /> */}
      {/* <Route path="/demo" component={Home} /> */}
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={Layout} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route component={Login} />
    </Switch>
  );
};

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user._id,
    userName: state.user.userName || 'user'
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};
export default withRouter(connect(mapState, mapDispatch)(App));

