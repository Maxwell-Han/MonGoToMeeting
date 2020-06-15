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
      handleDroppedItem(item.data._id);
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem(),
    }),
  });

  const handleDroppedItem = async (itemId) => {
    await markItemDone(currentRoom.roomId, itemId);
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
    currentRoom: state.currentRoom,
  };
};

const mapDispatch = (dispatch) => {
  return {
    markItemDone: (roomId, itemId) => dispatch(markItemDone(roomId, itemId)),
  };
};

export default connect(mapState, mapDispatch)(DoneItemDropArea);
