import React from "react";
import { Anchor, Button, Header, Text } from "grommet";
import { Logout, Globe, Linkedin, Github } from "grommet-icons";

const TopMenu = (props) => {
  return (
    <Header background="brand" elevation="medium">
      <div className="social-icons">
        <Button
          icon={<Globe />}
          href="https://maxhan.dev"
          target="_blank"
          hoverIndicator
        />
        <Button
          icon={<Github />}
          href="https://github.com/Maxwell-Han/MonGoToMeeting"
          target="_blank"
          hoverIndicator
        />
        <Button
          icon={<Linkedin />}
          href="http://linkedin.com/in/maxwellhan"
          target="_blank"
          hoverIndicator
        />
      </div>
      <Text weight="bold">MONGOTOMEETING</Text>
      <Button
        plain
        icon={<Logout />}
        label="Log Out"
        onClick={props.handleLogout}
        style={{ paddingRight: "3px" }}
        hoverIndicator
      />
    </Header>
  );
};

export default TopMenu;
