import React from "react";
import { Anchor, Button, Header, Text } from "grommet";
import { Logout, Globe, Linkedin, Github } from "grommet-icons";
import socket from "../../socket";
import SocialIcons from "./SocialIcons";

const TopMenu = (props) => {
  return (
    <Header background="brand" elevation="medium">
      <section className="top-header-grid">
        <SocialIcons />
        <Text weight="bold">MONGOTOMEETING</Text>
        <Button
          plain
          icon={<Logout />}
          label="Log Out"
          onClick={props.handleLogout}
          hoverIndicator
          className="logout-button"
        />
      </section>
    </Header>
  );
};

export default TopMenu;
