import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import "./index.css";
import { logout } from "./store";
import * as Space from "react-spaces";
import { ViewPort, Fill, BottomResizable, LeftResizable } from "react-spaces";
import { Header, Nav, Box, TextArea } from "grommet";

const Home = (props) => {
  const { handleLogout } = props;
  return (
    <>
      <ViewPort>
        <Fill>
          <Header background="brand">
            <h3>Menu goes here</h3>
            <Nav direction="row">
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </Nav>
          </Header>
          <h4>Welcome to the home page</h4>
          <h3>You have been logged in!</h3>
          <h3>{`Welcome ${props.user.email}`}</h3>
        </Fill>
        <BottomResizable size={500} style={{ border: "2px solid blue" }}>
          <LeftResizable size={360} style={{ border: "2px solid blue" }}>
            <Fill>
              <Header background="brand" height="xxsmall" elevation="medium">
                <h4>Rooms Menu</h4>
              </Header>
            </Fill>
            <BottomResizable
              size={200}
              style={{ border: "2px solid aliceblue" }}
            >
              <Header background="brand" height="xxsmall" elevation="medium">
                <h3>Contacts</h3>
              </Header>
            </BottomResizable>
          </LeftResizable>
          <Fill>
            <Box border={{ color: "brand", size: "large" }} fill>
              <Header background="brand">
                <h3>Chat Menu goes here</h3>
              </Header>
              <Box basis="3/4">
                <h4>Chat messages go here</h4>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </Box>
              <Box basis="auto" align="end">
                <Box fill>
                  <TextArea
                    value={
                      "Hello world Hello world Hello worldHello world Hello world"
                    }
                  ></TextArea>
                </Box>
              </Box>
            </Box>
          </Fill>
        </BottomResizable>
      </ViewPort>
    </>
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
