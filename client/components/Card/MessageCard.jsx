import React from "react";
import { Avatar, Box, Grommet } from "grommet";
import { grommet } from "grommet/themes";
const MessageCard = (props) => {
  return (
    <Box
      fill
      direction="row"
      align="center"
      justify="between"
      pad="xsmall"
      elevation="small"
      height={{"min": "2.4rem", "max": "2.75rem"}}
      className="message-card-container"
    >
      <Grommet theme={grommet}>
        <Avatar background="dark-2" size="xsmall" round={false}>
          U
        </Avatar>
      </Grommet>
      <div className="message-content-container">
        <section>{props.userName}</section>
        <section>{props.content}</section>
      </div>
    </Box>
  );
};

export default MessageCard;
