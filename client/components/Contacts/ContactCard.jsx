import React, { useEffect } from "react";
import { Button, Box } from "grommet";
import { Add, Checkmark } from "grommet-icons";

const ContactCard = ({ handleAdd, user, inRoom, roomId }) => {
  return (
    <Box
      fill
      direction="row"
      align="center"
      justify="between"
      elevation="small"
    >
      <p>{user.userName}</p>
      <div className="contact-card-options">
        {inRoom && <Checkmark />}
        <Button
          icon={<Add />}
          disabled={inRoom}
          onClick={() => handleAdd(roomId, user._id)}
        />
      </div>
    </Box>
  );
};

export default ContactCard;
