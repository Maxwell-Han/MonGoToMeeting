import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import "./index.css";
import { logout } from "./store";
import * as Space from "react-spaces";
import { ViewPort, Fill, BottomResizable } from "react-spaces";

const Home = (props) => {
  const { handleLogout } = props;
  return (
    <div>
      <ViewPort>
        <Fill>
          <h4>Welcome to the home page</h4>
          <h3>You have been logged in!</h3>
          <h3>{`Welcome ${props.user.email}`}</h3>
        </Fill>
        <BottomResizable size={100} style={{border:'2px solid blue'}}>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </BottomResizable>
      </ViewPort>
    </div>
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
