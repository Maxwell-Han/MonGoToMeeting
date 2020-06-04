import React, { useState } from "react";
import { Box, Button, Meter, Stack, Text } from "grommet";
import { Clear, Checkmark } from "grommet-icons";

const VoteForm = ({ item }) => {
  const votesYes = item.votes.filter((el) => el === "yes");
  const votesNo = item.votes.length - votesYes;
  return (
    <>
      <div className="votes-display">
        <div>{`Y: `}</div>
        <div>{votesYes}</div>
        <Button plain icon={<Clear />} onClick={() => {}} />
        <div>{`N: `}</div>
        <div>{votesNo}</div>
        <Button plain icon={<Checkmark />} onClick={() => {}} />
      </div>
      <Stack anchor="center">
        <Meter
          type="circle"
          values={[{ value: 45 }]}
          size="xsmall"
          thickness="small"
        />
        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
          <Text size="xlarge" weight="bold">
            {45}
          </Text>
          <Text size="small">%</Text>
        </Box>
      </Stack>
    </>
  );
};

export default VoteForm;
