import React from "react";
import { Anchor, Button, Header, Text } from "grommet";
import { Logout, Globe, Linkedin, Github } from "grommet-icons";

const TopMenu = (props) => {
  return (
    <Header background="brand" elevation="medium">
      <div className="social-icons">
        <Anchor icon={<Globe />} href="https://maxhan.dev" target="_blank" />
        <Anchor
          icon={<Github />}
          href="https://github.com/Maxwell-Han/MonGoToMeeting"
          target="_blank"
        />
        <Anchor
          icon={<Linkedin />}
          href="http://linkedin.com/in/maxwellhan"
          target="_blank"
        />
      </div>
      <Text weight="bold">MONGOTOMEETING</Text>
      <Button
        plain
        icon={<Logout />}
        label="Log Out"
        onClick={props.handleLogout}
        style={{ paddingRight: "3px" }}
      />
    </Header>
  );
};

export default TopMenu;
