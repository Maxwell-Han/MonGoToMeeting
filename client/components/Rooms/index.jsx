import React from "react";
import { Header, Button, Nav, Box, TextArea } from "grommet";
import { AddCircle } from "grommet-icons";
const Rooms = () => {
  return (
    <Header background="brand" height="xxsmall" elevation="medium">
      <h4>Rooms Menu</h4>
      <Button plain icon={<AddCircle />} onClick={() => {}} />
    </Header>
  );
};

export default Rooms;
