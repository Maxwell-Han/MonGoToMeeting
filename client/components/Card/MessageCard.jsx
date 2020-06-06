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
    >
      <Grommet theme={grommet}>
        <Avatar background="dark-2" size="xsmall" round={false}>
          {props.userName[0].toUpperCase()}
        </Avatar>
      </Grommet>
      <div className="message-content-container">
        <div className="message-display">
          <div className="message-user-name">{props.userName}</div>
          <div id="chat-date">{toChatDate(props.createdAt)}</div>
        </div>
        <section>{props.content}</section>
      </div>
    </Box>
  );
};

export default MessageCard;
