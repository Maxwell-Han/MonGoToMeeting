import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import "./index.css";
import { logout } from "./store";
import * as Space from "react-spaces";
import { ViewPort, Fill, BottomResizable, LeftResizable } from "react-spaces";

const Home = (props) => {
  const { handleLogout } = props;
  return (
    <ViewPort>
      <Fill>
        <h4>Welcome to the home page</h4>
        <h3>You have been logged in!</h3>
        <h3>{`Welcome ${props.user.email}`}</h3>
      </Fill>
      <BottomResizable size={100} style={{ border: "2px solid blue" }}>
        <LeftResizable size={60} style={{ border: "2px solid blue" }}>
          <h4>Left chat menu </h4>
          <h3>Goes Here</h3>
        </LeftResizable>
        <Fill>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </Fill>
      </BottomResizable>
    </ViewPort>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
