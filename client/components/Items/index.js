import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItems } from "../../store";
import { Header, Text } from "grommet";
import ItemCard from "../Card/ItemCard";
import OpenItemsDropArea from "./OpenItemsDropArea";
import DragWrapper from "../DragAndDrop";

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
      <div>Meeting Items</div>
      <OpenItemsDropArea>
        {!!openItemIds.length &&
          openItemIds.map((id) => {
            return (
              <DragWrapper key={id} item={items[id]}>
                <ItemCard item={items[id]} />
              </DragWrapper>
            );
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
