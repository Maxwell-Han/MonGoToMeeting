import React, { useEffect } from "react";
import { Button, Box } from "grommet";
import { Add, Checkmark } from "grommet-icons";

const MenuCard = ({
  displayName,
  onlineOrCount,
  buttonHandler,
  buttonIcon,
  handlerArgs,
}) => {
  return (
    <Box
      fill
      direction="row"
      align="center"
      justify="between"
      elevation="small"
    >
      <p>{displayName}</p>
      <div className="menu-card-options">
        {onlineOrCount && <Checkmark />}
        <Button
          icon={buttonIcon}
          disabled={onlineOrCount}
          onClick={() => buttonHandler(...handlerArgs)}
        />
      </div>
    </Box>
  );
};

export default MenuCard;
