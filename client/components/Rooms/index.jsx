import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createRoom,
  getRooms,
  setRoom,
  getMessages,
  getMembers,
  getItems,
  deleteRoom,
} from "../../store";
import {
  Header,
  Button,
  Box,
  Text,
  Layer,
  Heading,
  FormField,
  TextInput,
} from "grommet";
import { AddCircle, FormClose } from "grommet-icons";

const Rooms = (props) => {
  const {
    user,
    rooms,
    currentRoom,
    deleteRoom,
    getMessages,
    getMembers,
    getItems
  } = props;
  const [open, setOpen] = useState();
  const [roomName, setRoomName] = useState("");

  const onClose = () => setOpen(undefined);
  const onOpen = () => setOpen(true);

  useEffect(() => {
    props.getRooms(user._id);
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const ownerId = user._id;
    console.log(roomName, user);
    await props.createRoom(roomName, ownerId);
    onClose();
  };

  const handleSelectRoom = (roomId) => {
    props.setRoom(roomId);
    getMessages(roomId);
    getMembers(roomId);
    // await this.props.gotRoomId(roomId);
    getItems(roomId);
  };

  const onChange = (e) => {
    const { value: newValue } = event.target;
    setRoomName(newValue);
  };

  return (
    <section className="roomContainer">
      <Header background="brand" elevation="small" className="chat-area-header">
        <h4>Rooms Menu</h4>
        <Button plain icon={<AddCircle />} onClick={onOpen} />
      </Header>
      <div className="room-list-container">
        <Box gap="xxsmall" direction="column">
          {!!Object.keys(rooms).length > 0 &&
            Object.keys(rooms).map((id) => (
              <Box
                key={id}
                id={id}
                direction="row"
                justify="between"
                align="center"
                elevation="medium"
                pad="small"
                overflow="hidden"
                height={{ max: "3rem" }}
                className="room-card"
              >
                <p className="room-name" onClick={() => handleSelectRoom(id)}>
                  {rooms[id].roomName}
                </p>
                <div className="room-menu-container">
                  <p></p>
                  <Button
                    plain
                    icon={<FormClose />}
                    onClick={() => deleteRoom(id)}
                  ></Button>
                </div>
              </Box>
            ))}
        </Box>
      </div>
      {open && (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Confirm
            </Heading>
            <Text>Enter the new room name</Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <FormField label="name">
                <TextInput onChange={onChange} />
              </FormField>
              <Button
                label={
                  <Text color="white">
                    <strong>Create</strong>
                  </Text>
                }
                onClick={(e) => handleCreateRoom(e)}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
    </section>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    rooms: state.rooms,
    currentRoom: state.currentRoom,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createRoom: (roomName, ownerId) => dispatch(createRoom(roomName, ownerId)),
    getRooms: (userId) => dispatch(getRooms(userId)),
    setRoom: (roomId) => dispatch(setRoom(roomId)),
    getMessages: (roomId) => dispatch(getMessages(roomId)),
    getMembers: (roomId) => dispatch(getMembers(roomId)),
    deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
    getItems: (roomId) => dispatch(getItems(roomId)),
  };
};

export default connect(mapState, mapDispatch)(Rooms);
