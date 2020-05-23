import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import "./index.css";
import { logout } from "./store";

const Home = (props) => {
  const { handleLogout } = props;
  return (
    <div>
      <h4>Welcome to the home page</h4>
      <h3>You have been logged in!</h3>
      <h3>{`Welcome ${props.user.email}`}</h3>
      <a href="#" onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Home);
