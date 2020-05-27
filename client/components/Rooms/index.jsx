import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createRoom, getRooms, setRoom } from "../../store";
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
import { AddCircle, Close } from "grommet-icons";

const Rooms = (props) => {
  const { user, rooms } = props;
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
    console.log("clicked handle room select ", "..", roomId, roomId.length);
    // await this.props.getMessages(roomId);
    // await this.props.getMembers(roomId);
    // await this.props.gotRoomId(roomId);
    // await this.props.getItems(roomId);
    props.setRoom(roomId);
  };

  const onChange = (e) => {
    const { value: newValue } = event.target;
    setRoomName(newValue);
  };

  return (
    <section className="roomContainer">
      <Header background="brand" height="xxsmall" elevation="medium">
        <h4>Rooms Menu</h4>
        <Button plain icon={<AddCircle />} onClick={onOpen} />
      </Header>
      <div className="room-list-container">
        <Box gap="xxsmall" direction="column">
          {Object.keys(rooms).length > 0 &&
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
              >
                <p className="room-name" onClick={() => handleSelectRoom(id)}>
                  {rooms[id].roomName}
                </p>
                <div className="room-menu-container">
                  <p>#</p>
                  <Button plain icon={<Close />}></Button>
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
    currentRoom: state.currentRoom
  };
};

const mapDispatch = (dispatch) => {
  return {
    createRoom: (roomName, ownerId) => dispatch(createRoom(roomName, ownerId)),
    getRooms: (userId) => dispatch(getRooms(userId)),
    setRoom: (roomId) => dispatch(setRoom(roomId)),
  };
};

export default connect(mapState, mapDispatch)(Rooms);
