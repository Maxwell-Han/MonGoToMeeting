import React from "react";
import { connect } from "react-redux";
import { unsetFocusItem } from "../../store";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";

const ItemListDropArea = (props) => {
  const { currentRoom, unsetFocusItem } = props
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log("Card being moved BACK over to item LIST area", item);
      handleDroppedItem(item.data._id)
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem(),
    }),
  });

  const handleDroppedItem = itemId => {
    console.log("handling dropped item");
    unsetFocusItem(props.currentRoom.roomId, itemId);
  };

  return (
    <div
      ref={drop}
      className="items-list"
      style={{ background: !!isOver ? "#F2F2F2" : "" }}
    >
      {props.children}
    </div>
  );
};

const mapState = (state) => {
  return {
    // inFocusItem: state.inFocusItem,
    currentRoom: state.currentRoom,
  };
};

const mapDispatch = (dispatch) => {
  return {
    unsetFocusItem: (roomId, itemId) =>
      dispatch(unsetFocusItem(roomId, itemId)),
  };
};

export default connect(mapState, mapDispatch)(ItemListDropArea);

