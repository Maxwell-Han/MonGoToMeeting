import React from "react";
import { Anchor, Button, Header, Text } from "grommet";
import { Logout, Globe, Linkedin, Github } from "grommet-icons";

const TopMenu = (props) => {
  return (
    <Header background="brand" elevation="medium">
      <div className="social-icons">
        <Anchor icon={<Globe />} href="#" />
        <Anchor icon={<Github />} href="#" />
        <Anchor icon={<Linkedin />} href="#" />
      </div>
      <Text weight="bold">MONGOTOMEETING</Text>
      <Button icon={<Logout />} label="Log Out" onClick={props.handleLogout} />
    </Header>
  );
};

export default TopMenu;
