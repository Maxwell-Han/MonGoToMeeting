import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addMessage } from "../../store";
import MessageCard from "../Card/MessageCard";
import { Box, Button, TextInput } from "grommet";
import { Send } from "grommet-icons";

const Messages = (props) => {
  const { user, visible, currentRoom, addMessage } = props;
  const [userMessage, setMessage] = useState("");
  const messagesContainer = useRef();
  const updateScrollY = () => {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
    console.log('Updateing scroll! ', messagesContainer.current.scrollTop, messagesContainer.current.scrollHeight)
  }
  useEffect( () => {
    updateScrollY()
  }, [currentRoom])
  const handleAddMessage = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const userName = user.userName;
    const roomId = currentRoom.roomId;
    const message = { content: userMessage, userName, userId, roomId };
    console.log("adding message to room ", message);
    await addMessage(roomId, message);
    console.log('component update fn is ', updateScrollY)
    setMessage("");
  };
  return (
    <Box style={visible ? {} : {display: 'none'}} fill>
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
        <TextInput
          value={userMessage}
          onChange={(e) => setMessage(e.target.value)}
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    addMessage: (roomId, message) => dispatch(addMessage(roomId, message)),
  };
};

export default connect(mapState, mapDispatch)(Messages);

