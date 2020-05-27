import React, { useState } from "react";
import { connect } from "react-redux";
import { Header, Box, Button, TextInput, extendDefaultTheme } from "grommet";
import { Send } from "grommet-icons";
import { base } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { logout } from "../../store";

extendDefaultTheme(
  deepMerge(base, {
    global: {
      input: {
        weight: "normal",
      },
    },
  })
);

const Chat = (props) => {
  const { currentRoom } = props;
  const [userMessage, setMessage] = useState("");
  const [currentTab, setTab] = useState({ messages: false, items: false });
  const selectTab = (tabName) => {
    if (tabName === "messages") setTab({ messages: true, items: false });
    else setTab({ messages: false, items: true });
  };
  return (
    <Box fill>
      <Header
        background="brand"
        height="xxsmall"
        elevation="medium"
        justify="start"
      >
        <h4>Menu</h4>
        <div className="tabs-container">
          <Button
            onClick={() => selectTab("messages")}
            style={{
              borderBottom: currentTab["messages"] ? "3px solid aliceblue" : "",
            }}
            focusIndicator={false}
          >
            Messages
          </Button>
          <Button
            onClick={() => selectTab("items")}
            style={{
              borderBottom: currentTab["items"] ? "3px solid aliceblue" : "",
            }}
            focusIndicator={false}
          >
            Items
          </Button>
        </div>
      </Header>
      <Box style={!currentTab["messages"] ? { visibility: "hidden" } : {} } fill>
        <section className="messages-container">
          <ul>
            <li>message</li>
            <li>message</li>
            <li>message</li>
            <li>message</li>
          </ul>
        </section>
        <TextInput
          value={userMessage}
          onChange={(e) => setMessage(e.target.value)}
        ></TextInput>
        <div>
          <Button
            plain={false}
            icon={<Send size="small" />}
            onClick={() => {}}
          />
        </div>
      </Box>
    </Box>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    currentRoom: state.currentRoom,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Chat);
