import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUsers, addBuddyToRoom } from "../../store";
import {
  Header,
  Heading,
  Button,
  Box,
  Layer,
  Text,
  FormField,
  TextInput,
} from "grommet";
import { Search, Close, Add } from "grommet-icons";
import MenuCard from "../Card/MenuCard";

const AddContactsMenu = (props) => {
  const {
    addBuddyToRoom,
    currentRoom,
    currentRoomUsers,
    onClose,
    getUsers,
    users,
  } = props;
  useEffect(() => {
    getUsers();
  }, []);
  const [searchText, setSearchText] = useState("");
  const onChange = (e) => {
    const { value: newValue } = event.target;
    setSearchText(newValue);
  };

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <div className="add-contact-container">
        <Text className="add-contact-title">Add a Contact to the Room</Text>
        <Box
          width="medium"
          direction="row"
          margin="small"
          align="center"
          round="small"
          pad={{ right: "0.75rem" }}
          border
        >
          <TextInput
            plain
            icon={<Search />}
            placeholder="search ..."
            onChange={onChange}
          />
          <Button plain={true} icon={<Close />} />
        </Box>

        <Box fill margin="small" className="contact-list-container">
          <section>
            {Object.keys(users).length &&
              Object.keys(users).map((id) => (
                <MenuCard
                  displayName={users[id].userName}
                  key={users[id]["_id"]}
                  onlineOrCount={id in currentRoomUsers}
                  buttonHandler={addBuddyToRoom}
                  buttonIcon={<Add />}
                  handlerArgs={[currentRoom.roomId, users[id]._id]}
                />
              ))}
          </section>
        </Box>
      </div>
    </Layer>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    users: state.users,
    currentRoom: state.currentRoom,
    currentRoomUsers: state.currentRoomUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
    addBuddyToRoom: (roomId, buddyId) =>
      dispatch(addBuddyToRoom(roomId, buddyId)),
  };
};

export default connect(mapState, mapDispatch)(AddContactsMenu);
