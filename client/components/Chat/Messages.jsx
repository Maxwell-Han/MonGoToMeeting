import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addMessage, isTyping, stopTyping } from "../../store";
import MessageCard from "../Card/MessageCard";
import TypingNotification from "./TypingNotification";
import { Box, Button, TextInput } from "grommet";
import { Send } from "grommet-icons";

const Messages = (props) => {
  const {
    user,
    visible,
    currentRoom,
    currentRoomUsers,
    addMessage,
    isTyping,
    stopTyping,
    typing,
  } = props;
  const [userMessage, setMessage] = useState("");
  const [typingTimer, setTypingTimer] = useState(null);

  const messagesContainer = useRef();

  const updateScrollY = () => {
    messagesContainer.current.scrollTop =
      messagesContainer.current.scrollHeight;
  };

  useEffect(() => {
    updateScrollY();
  }, [currentRoom]);

  const usersInRoomTyping = Object.keys(currentRoomUsers)
    .filter((id) => {
      let userName = currentRoomUsers[id].userName;
      let isTyping = Object.keys(typing).includes(userName);
      let notSelf = userName !== user.userName;
      return isTyping && notSelf;
    })
    .map((id) => currentRoomUsers[id].userName);

  const handleAddMessage = async (e) => {
    if (e) e.preventDefault();
    const userId = user._id;
    const userName = user.userName;
    const roomId = currentRoom.roomId;
    const message = { content: userMessage, userName, userId, roomId };

    await addMessage(roomId, message);
    setMessage("");
  };
  const handleTyping = (textVal) => {
    setMessage(textVal);
    clearTimeout(typingTimer);
    isTyping(currentRoom.roomId, user.userName);
    let newTimer = setTimeout(() => {
      stopTyping(currentRoom.roomId, user.userName);
    }, 2800);
    setTypingTimer(newTimer);
  };

  const handleEnterKey = () => {
    if (event.key === "Enter") {
      handleAddMessage();
    }
  };
  return (
    <Box style={visible ? {} : { display: "none" }} fill>
      <section className="messages-container" ref={messagesContainer}>
        <Box fill direction="row" pad="xsmall" />
        {!!currentRoom.messages.length &&
          currentRoom.messages.map((message) => (
            <MessageCard
              key={message._id}
              content={message.content}
              createdAt={message.createdAt}
              userName={message.userName}
            />
          ))}
      </section>
      <div className="chat-input-container">
        <TypingNotification typingUsers={usersInRoomTyping} />
        <TextInput
          value={userMessage}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={handleEnterKey}
          className="chat-input"
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
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    currentRoom: state.currentRoom,
    currentRoomUsers: state.currentRoomUsers,
    typing: state.typing,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addMessage: (roomId, message) => dispatch(addMessage(roomId, message)),
    isTyping: (roomId, userName) => dispatch(isTyping(roomId, userName)),
    stopTyping: (roomId, userName) => dispatch(stopTyping(roomId, userName)),
  };
};

export default connect(mapState, mapDispatch)(Messages);
