import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { ViewPort, Fill, BottomResizable, LeftResizable } from "react-spaces";
import {
  Contacts,
  Rooms,
  Chat,
  Items,
  Focus,
  ClosedItems,
  TopMenu,
} from "../components";
import socket from "../socket";
import user from "../store/user";

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
          <TopMenu handleLogout={props.handleLogout} logSockets={logSockets} />
          <section className="meeting-space-container">
            <Items />
            <Focus />
            <ClosedItems />
          </section>
        </Fill>
        <BottomResizable
          trackSize={true}
          size={365}
          onResizeEnd={(newSize) => {
            setSize(newSize);
          }}
          style={{ borderTop: "2px solid #999999" }}
        >
          <LeftResizable size={360}>
            <Fill>
              <Rooms />
            </Fill>
            <BottomResizable
              size={200}
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
