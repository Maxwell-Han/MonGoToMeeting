import React, { useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../../store";
import { Box, Button, Form, TextInput, Select, FormField, Text } from "grommet";

const ItemMenu = (props) => {
  const { visible, currentRoom, addItem } = props;
  const [defaultView, setView] = useState("");
  const [itemName, setName] = useState("");
  const [description, setDescription] = useState("");
  const options = [
    { label: "Vote", value: "vote" },
    { label: "Rating", value: "rating" },
  ];

  const handleAddItem = (data) => {
    const { itemName: name, defaultView, description } = data;
    if (!name.length) {
      setShowMessage(true);
      return
    }
    const item = { name, defaultView, description, roomId: currentRoom.roomId };
    addItem(item);
    setShowMessage(false)
    setView('')
    setName('')
    setDescription('')
    console.log('Add Item ', item)
  };

  const [showMessage, setShowMessage] = useState(false);
  const message =
    showMessage && !itemName.length
      ? "Must include the item's name"
      : undefined;
  return (
    <Box fill style={!!visible ? {} : { display: "none" }}>
      <div className="item-form">
        <Form
          value={{ itemName, defaultView, description }}
          onSubmit={({ value: nextValue }) => handleAddItem(nextValue)}
          onReset={({ value }) => {}}
        >
          <FormField label="Item Name" required>
            <TextInput
              placeholder="enter a name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField label="Description">
            <TextInput
              placeholder="enter a description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField label="Default View" name="default-view">
            <Select
              name="defaultView"
              placeholder="Choose the default view"
              options={options}
              labelKey="label"
              valueKey={{ key: "value", reduce: true }}
              value={defaultView}
              onChange={({ value: nextValue }) => setView(nextValue)}
            />
          </FormField>
          {message && (
            <Box pad={{ horizontal: "small" }} direction="row" justify="center">
              <Text color="status-error">{message}</Text>
            </Box>
          )}
          <Box direction="row" justify="around">
            <Button type="submit" label="Add Item" primary />
            <Button type="reset" label="Reset" secondary />
          </Box>
        </Form>
      </div>
    </Box>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    currentRoom: state.currentRoom,
    currentRoomUsers: state.currentRoomUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
  };
};

export default connect(mapState, mapDispatch)(ItemMenu);
