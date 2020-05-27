import React from "react";
import { connect } from "react-redux";
import { createRoom, getRooms } from "../../store";
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
import { AddCircle } from "grommet-icons";

const Rooms = (props) => {
  const { user } = props;
  const [open, setOpen] = React.useState();
  const [roomName, setRoomName] = React.useState("");

  const onClose = () => setOpen(undefined);
  const onOpen = () => setOpen(true);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const ownerId = user._id;
    console.log(roomName, user);
    await props.createRoom(roomName, ownerId);
    onClose();
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
        <h4>Rooms list</h4>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    createRoom: (roomName, ownerId) => dispatch(createRoom(roomName, ownerId)),
  };
};

export default connect(mapState, mapDispatch)(Rooms);
