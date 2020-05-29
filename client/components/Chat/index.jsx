import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Header, Box, Button, TextInput, extendDefaultTheme } from "grommet";
import { Send } from "grommet-icons";
import { base } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { logout, addMessage } from "../../store";
import { getRooms } from "../../store/rooms";
import MessageCard from "../Card/MessageCard";

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

  const [userMessage, setMessage] = useState("");
  const [currentTab, setTab] = useState({ messages: false, items: false });
  const selectTab = (tabName) => {
    if (tabName === "messages") setTab({ messages: true, items: false });
    else setTab({ messages: false, items: true });
  };
  const handleAddMessage = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const userName = user.userName
    const roomId = currentRoom.roomId;
    const message = { content: userMessage, userName, userId, roomId };
    console.log("adding message to room ", message);
    await addMessage(roomId, message);
    setMessage("");
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
      <Box style={!currentTab["messages"] ? { visibility: "hidden" } : {}} fill>
        <section className="messages-container">
          {!!currentRoom.messages.length &&
            currentRoom.messages.map((message) => (
              <MessageCard
                key={message._id}
                content={message.content}
                userName={message.userName}
              />
            ))}
        </section>
        <div className="chat-input-container">
          <TextInput
            value={userMessage}
            onChange={(e) => setMessage(e.target.value)}
          ></TextInput>
          <div className="chat-input-menu">
            <Button
              plain={false}
              icon={<Send size="small" />}
              onClick={handleAddMessage}
              disabled={
                userMessage === "" || currentRoom.roomId === "" ? true : false
              }
            />
          </div>
        </div>
      </Box>
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
