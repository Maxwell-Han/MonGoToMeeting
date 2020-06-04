import React from "react";
import { connect } from "react-redux";
import { markItemDone } from "../../store";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";

const DoneItemDropArea = (props) => {
  const { markItemDone, currentRoom } = props;
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log("Card being moved to Done area", item);
      console.log(item.data);
      handleDroppedItem(item.data._id);
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem(),
    }),
  });

  const handleDroppedItem = async (itemId) => {
    console.log("handling dropped item");
    await markItemDone(currentRoom.roomId, itemId);
  };

  return (
    <div
      ref={drop}
      className="items-list"
      style={{ background: !!isOver ? "yellow" : "" }}
    >
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
    markItemDone: (roomId, itemId) => dispatch(markItemDone(roomId, itemId)),
  };
};

export default connect(mapState, mapDispatch)(DoneItemDropArea);
