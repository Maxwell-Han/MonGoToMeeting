import React, { useEffect } from "react";
import { Button, Box } from "grommet";
import { Add, Checkmark } from "grommet-icons";

const MenuCard = ({
  displayName,
  onlineOrCount,
  buttonHandler,
  buttonIcon,
  handlerArgs,
  statusIcon
}) => {
  return (
    <Box
      fill
      direction="row"
      align="center"
      justify="between"
      elevation="small"
      className="menu-card"
    >
      <p>{displayName}</p>
      <div className="menu-card-options">
        {Array.isArray(statusIcon) && onlineOrCount ? statusIcon[0] : statusIcon[1]}
        {!Array.isArray(statusIcon) && onlineOrCount ? statusIcon : null}
        <Button
          icon={buttonIcon}
          onClick={() => buttonHandler(...handlerArgs)}
        />
      </div>
    </Box>
  );
};

export default MenuCard;
