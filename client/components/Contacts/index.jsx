import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteUserFromRoom } from "../../store";
import { Header, Button, Box } from "grommet";
import AddContactsMenu from "./AddContactsMenu";
import MenuCard from "../Card/MenuCard";
import { UserAdd, FormClose, StatusDisabledSmall, StatusGoodSmall } from "grommet-icons";

const Contacts = (props) => {
  const { currentRoom, currentRoomUsers, deleteUserFromRoom } = props;
  const [open, setOpen] = useState();
  const [searchText, setSearchText] = useState("");
  const onOpen = () => setOpen(true);
  const onClose = () => {
    console.log("running on close");
    setOpen(undefined);
  };
  const onChange = (e) => {
    const { value: newValue } = event.target;
    setSearchText(newValue);
  };
  return (
    <section className="contacts-container">
      <Header background="brand" height="xxsmall" elevation="medium">
        <h3>Contacts</h3>
        <Button plain icon={<UserAdd />} onClick={onOpen} />
      </Header>
      <div className="contact-list-container">
        <Box gap="xxsmall" direction="column" elevation="medium">
          <section>
            {!!Object.keys(currentRoomUsers).length &&
              Object.keys(currentRoomUsers).map((id) => (
                <MenuCard
                  key={id}
                  displayName={currentRoomUsers[id].userName}
                  onlineOrCount={false}
                  buttonHandler={deleteUserFromRoom}
                  buttonIcon={<FormClose />}
                  handlerArgs={[currentRoom.roomId, id]}
                />
              ))}
          </section>
        </Box>
      </div>
      {/* MODAL TO ADD CONTACT */}
      {open && <AddContactsMenu onClose={onClose} />}
    </section>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    currentRoom: state.currentRoom,
    currentRoomUsers: state.currentRoomUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteUserFromRoom: (roomId, userId) =>
      dispatch(deleteUserFromRoom(roomId, userId)),
  };
};

export default connect(mapState, mapDispatch)(Contacts);
