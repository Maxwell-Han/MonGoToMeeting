import React from "react";
import { connect } from "react-redux";
import { setFocusItem } from "../../store";
import { Header, Button, Box } from "grommet";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";

const DropAreaFocus = (props) => {
  const { setFocusItem } = props;

  const handleDroppedItem = (itemId) => {
    console.log("handling dropped item");
    setFocusItem(props.currentRoom.roomId, itemId);
  };

  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log("dropping item");
      console.log(item.data);
      handleDroppedItem(item.data._id);
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem(),
    }),
  });

  return (
    <div ref={drop} className="focus-items-container">
      {props.children}
    </div>
  );
};

const mapState = (state) => {
  return {
    currentRoom: state.currentRoom,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setFocusItem: (roomId, itemId) => dispatch(setFocusItem(roomId, itemId)),
  };
};

export default connect(mapState, mapDispatch)(DropAreaFocus);
