import React from "react";
import { Button } from "grommet";
import { Logout, Globe, Linkedin, Github } from "grommet-icons";

const SocialIcons = (props) => {
  return (
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
  );
};

export default SocialIcons;
