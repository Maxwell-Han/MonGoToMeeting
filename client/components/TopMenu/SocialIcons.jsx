import React from "react";
import { Button } from "grommet";
import { Globe, Linkedin, Github } from "grommet-icons";

const SocialIcons = (props) => {
  return (
    <div className="social-icons">
      <Button
        icon={<Globe />}
        href="https://bit.ly/2PuojpO"
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
  );
};

export default SocialIcons;
