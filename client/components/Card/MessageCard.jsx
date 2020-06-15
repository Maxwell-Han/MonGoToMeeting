import React from "react";
import { Avatar, Box, Grommet } from "grommet";
import { grommet } from "grommet/themes";
const MessageCard = (props) => {
  const toChatDate = (str) => {
    const date = new Date(str);
    let hrs = date.getHours();
    let mins = date.getMinutes();
    const meridiem = hrs >= 12 ? "pm" : "am";
    hrs %= 12;
    hrs = hrs || 12;
    mins = mins < 10 ? `0${mins}` : mins;
    return `${hrs}:${mins} ${meridiem}`;
  };
  const userInitial = props.userName[0].toUpperCase();
  const getAccent = () => {
    let code = userInitial.charCodeAt();
    let accent;
    if (code < 72) accent = "neutral-2";
    else if (code < 81) accent = "accent-3";
    else accent = "accent-4";
    return accent;
  };
  return (
    <Box
      fill
      direction="row"
      align="center"
      justify="between"
      pad="xsmall"
      elevation="small"
      height={{ min: "2.4rem", max: "2.75rem" }}
      className="message-card-container"
      style={{boxSizing: 'content-box'}}
    >
      <Grommet theme={grommet}>
        <Avatar
          background={getAccent()}
          size="xsmall"
          round="xxsmall"
          style={{ fontSize: "16px" }}
        >
          {userInitial}
        </Avatar>
      </Grommet>
      <div className="message-content-container">
        <div className="message-display">
          <div className="message-user-name">{props.userName}</div>
          <div id="chat-date">{toChatDate(props.createdAt)}</div>
        </div>
        <section className="message-text">{props.content}</section>
      </div>
    </Box>
  );
};

export default MessageCard;
