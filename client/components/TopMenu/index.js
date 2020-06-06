import React from "react";
import { Anchor, Button, Header, Text } from "grommet";
import { Logout, Globe, Linkedin, Github } from "grommet-icons";
import socket from "../../socket";

const TopMenu = (props) => {
  return (
    <Header background="brand" elevation="medium">
      <section className="top-header-grid">
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
          hoverIndicator
          className="logout-button"
        />
      </section>
    </Header>
  );
};

export default TopMenu;
