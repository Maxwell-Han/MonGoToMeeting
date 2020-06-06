import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Header, Box, Button, TextInput, extendDefaultTheme } from "grommet";
import { Send } from "grommet-icons";
import { base } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { logout, addMessage } from "../../store";
import { getRooms } from "../../store/rooms";
import MessageCard from "../Card/MessageCard";
import ItemMenu from "./ItemMenu";
import Messages from "./Messages";

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
  const { user, currentRoom, currentRoomUsers, addMessage } = props;

  // const [userMessage, setMessage] = useState("");
  const [currentTab, setTab] = useState({ messages: false, items: false });
  const selectTab = (tabName) => {
    if (tabName === "messages") setTab({ messages: true, items: false });
    else setTab({ messages: false, items: true });
  };

  return (
    <Box fill>
      <Header
        background="brand"
        elevation="small"
        justify="start"
        className="chat-area-header"
      >
        <h4>Menu</h4>
        <div className="tabs-container">
          <Button
            onClick={() => selectTab("messages")}
            style={{
              borderBottom: currentTab["messages"] ? "3px solid aliceblue" : "",
            }}
            focusIndicator={false}
            hoverIndicator
          >
            Messages
          </Button>
          <Button
            onClick={() => selectTab("items")}
            style={{
              borderBottom: currentTab["items"] ? "3px solid aliceblue" : "",
            }}
            focusIndicator={false}
            hoverIndicator
          >
            Items
          </Button>
        </div>
      </Header>
      <Messages visible={currentTab["messages"]} />
      <ItemMenu visible={currentTab["items"]} />
    </Box>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    currentRoom: state.currentRoom,
    currentRoomUsers: state.currentRoomUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout: dispatch(logout),
    addMessage: (roomId, message) => dispatch(addMessage(roomId, message)),
  };
};

export default connect(mapState, mapDispatch)(Chat);
