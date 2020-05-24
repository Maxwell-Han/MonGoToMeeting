import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import * as Space from "react-spaces";
import { ViewPort, Fill, BottomResizable, LeftResizable } from "react-spaces";
import { Header, Nav, Box, TextArea } from "grommet";
import { Contacts, Rooms } from '../components'

const Home = (props) => {
  const { handleLogout } = props;
  return (
    <>
      <ViewPort>
        {/* top nav menu */}
        <Fill>
          {/* meeting items section */}
        </Fill>
        <BottomResizable size={500} style={{ border: "2px solid blue" }}>
          <LeftResizable size={360} style={{ border: "2px solid blue" }}>
            <Fill>
              <Rooms />
            </Fill>
            <BottomResizable
              size={200}
              style={{ border: "2px solid aliceblue" }}
            >
              <Contacts />
            </BottomResizable>
          </LeftResizable>
          <Fill>
            <Box border={{ color: "brand", size: "large" }} fill>
              <Header background="brand" height="xxsmall">
                <h4>Chat Menu goes here</h4>
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
