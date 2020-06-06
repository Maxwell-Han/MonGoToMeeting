import React, { useState } from "react";
import { connect } from "react-redux";
import { udpateItemVote } from "../../../store";
import { Box, Button, Meter, Stack, Text } from "grommet";
import { Clear, Checkmark } from "grommet-icons";

const VoteForm = ({ currentRoom, item, udpateItemVote, user }) => {
  const votesYes = item.votesYes.length;
  const votesNo = item.votesNo.length;
  const percentVal = !item.votesYes.length
    ? 0
    : Math.floor((votesYes / (votesYes + votesNo)) * 100);
  const handleVote = (vote) => {
    udpateItemVote(currentRoom.roomId, item._id, user._id, vote);
  };
  return (
    <>
      <div className="votes-display">
        <div>{`Y: `}</div>
        <div>{votesYes}</div>
        <Button plain icon={<Checkmark />} onClick={() => handleVote("yes")} />
        <div>{`N: `}</div>
        <div>{votesNo}</div>
        <Button plain icon={<Clear />} onClick={() => handleVote("no")} />
      </div>
      <Stack anchor="center">
        <Meter
          type="circle"
          values={[{ value: percentVal }]}
          size="xxsmall"
          thickness="xsmall"
        />
        <Box direction="row" align="center" pad={{ bottom: "xxsmall" }}>
          <Text size="large" weight="bold">
            {parseInt(percentVal)}
          </Text>
          <Text size="small">%</Text>
        </Box>
      </Stack>
    </>
  );
};

const mapState = (state) => {
  return {
    currentRoom: state.currentRoom,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    udpateItemVote: (roomId, itemId, userId, vote) =>
      dispatch(udpateItemVote(roomId, itemId, userId, vote)),
  };
};

export default connect(mapState, mapDispatch)(VoteForm);
