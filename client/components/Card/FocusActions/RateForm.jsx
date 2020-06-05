import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { udpateItemRating } from "../../../store";
import { Button, TextInput } from "grommet";

const Rating = ({ item, udpateItemRating, currentRoom }) => {

  const [rating, setRating] = useState('');

  useEffect(() => {
    const defaultRating = item.rating ? item.rating : "TBD";
    setRating(defaultRating)
  }, [item])

  const handleRating = () => {
    udpateItemRating(currentRoom.roomId, item._id, rating)
  };

  return (
    <>
      <div>Rating</div>
      <div id="rating-input">
        <TextInput
          value={rating}
          type="number"
          min={1}
          max={5}
          onChange={(event) => setRating(event.target.value)}
        />
      </div>
      <Button primary onClick={handleRating}>Save</Button>
    </>
  );
};

const mapState = (state) => {
  return {
    currentRoom: state.currentRoom,
  };
};

const mapDispatch = (dispatch) => {
  return {
    udpateItemRating: (roomId, itemId, rating) =>
      dispatch(udpateItemRating(roomId, itemId, rating)),
  };
};

export default connect(mapState, mapDispatch)(Rating);
