import React, { useState, useEffect, useContext, useRef } from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import {
  ViewPort,
  Fill,
  BottomResizable,
  LeftResizable,
  TopResizable,
  Bottom,
} from "react-spaces";
import { Button, Header, Nav, Box, TextArea } from "grommet";
import { Contacts, Rooms, Chat } from "../components";

const Home = (props) => {
  useEffect(() => {
    console.log("loading main page running use effect");
  }, []);
  const [size, setSize] = useState(300);
  const handleSize = (newSize) => {
    console.log("handling on resize end ", size);
    setSize(newSize);
    console.log("size in state now ", size);
  };
  const ref = useRef(null);
  const checkResize = () => console.log("checking resize");
  return (
    <section>
      <ViewPort>
        {/* top nav menu */}
        <div>
          <Button onClick={props.handleLogout}>Log Out</Button>
        </div>
        {/* meeting items section */}
        <BottomResizable
          size={300}
          onResizeEnd={() => {
            console.log(
              "CHECKING REF HEIGHT ",
              ref.current.pageY
            );
            setSize(ref.current.getBoundingClientRect().top);
          }}
        >
          <div ref={ref}></div>
          <LeftResizable size={360} style={{ border: "2px solid blue" }}>
            <Fill>
              <Rooms />
            </Fill>
            <BottomResizable
              size={200}
              style={{ border: "2px solid aliceblue" }}
              trackSize={true}
              maximumSize={Math.floor(size * 0.8)}
              // minimumSize={100}
              onClick={() => console.log("HIT ON CLICK LEFT PANEL")}
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
