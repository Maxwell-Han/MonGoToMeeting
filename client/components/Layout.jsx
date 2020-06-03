import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import {
  Custom,
  ViewPort,
  Fill,
  BottomResizable,
  LeftResizable,
  TopResizable,
  Bottom,
} from "react-spaces";
import { Button, Header, Nav, Box, TextArea } from "grommet";
import { Contacts, Rooms, Chat, Items, Focus, ClosedItems } from "../components";
import socket from "../socket";

const Home = (props) => {
  const [size, setSize] = useState(300);
  const handleSize = (newSize) => {
    setSize(newSize);
  };
  const logSockets = () => {
    socket.emit("LOG_STATE");
  };
  return (
    <section>
      <ViewPort>
        <Fill>
          <Header>
            <Button onClick={props.handleLogout}>Log Out</Button>
            <Button onClick={logSockets}>Print Sockets Server</Button>
          </Header>
          <section className="meeting-space-container">
            <Items />
            <Focus />
            <ClosedItems />
            <h4>done</h4>
          </section>
        </Fill>
        <BottomResizable
          trackSize={true}
          size={365}
          onResizeEnd={(newSize) => {
            setSize(newSize);
          }}
        >
          <LeftResizable size={360} style={{ border: "2px solid blue" }}>
            <Fill>
              <Rooms />
            </Fill>
            <BottomResizable
              size={200}
              style={{ border: "2px solid aliceblue" }}
              trackSize={true}
              maximumSize={Math.floor(size) - 50}
              minimumSize={100}
            >
              <Contacts />
            </BottomResizable>
          </LeftResizable>
          <Fill>
            <Chat />
          </Fill>
        </BottomResizable>
      </ViewPort>
    </section>
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
