import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItems } from "../../store";
import { Header, Text } from "grommet";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../constants";
import OpenItemsDropArea from "./OpenItemsDropArea";

const DragWrapper = (props) => {
  const { item } = props;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, data: { ...item } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="temp-list-item"
      style={{
        display: isDragging ? "none" : "block",
        cursor: "move",
      }}
    >
      <div>{item.name}</div>
    </div>
  );
};

const Items = (props) => {
  const { getItems, items, currentRoom } = props;
  const openItemIds = Object.keys(items).filter((id) => {
    return items[id].inFocus === false && items[id].status === "open";
  });
  console.log(
    "open item ids are ",
    Object.keys(openItemIds).map((id) => items[id])
  );
  return (
    <section className="items-container">
      <Header>
        <h4>Meeting Items</h4>
      </Header>
      <OpenItemsDropArea>
        {!!openItemIds.length &&
          openItemIds.map((id) => {
            return <DragWrapper key={id} item={items[id]} />;
          })}
      </OpenItemsDropArea>
    </section>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    currentRoom: state.currentRoom,
    items: state.items,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItems: (roomId) => dispatch(getItems(roomId)),
  };
};

export default connect(mapState, mapDispatch)(Items);
