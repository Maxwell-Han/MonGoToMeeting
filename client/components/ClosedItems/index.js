import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Header, Button, Box } from "grommet";
import DoneItemDropArea from "./DoneItemDropArea";
import ItemCard from "../Card/ItemCard";
import DragWrapper from "../DragAndDrop";

const ClosedItems = (props) => {
  const { items } = props;
  const inFocusItems = Object.keys(items).filter(
    (id) => !items[id].inFocus && items[id].status === "closed"
  );
  console.log("done items are ", inFocusItems);
  return (
    <section className="items-container">
      <div>Done Items</div>
      <DoneItemDropArea>
        {!!inFocusItems.length &&
          inFocusItems.map((id) => (
            <DragWrapper key={id} item={items[id]}>
              <ItemCard item={items[id]} key={id} />
            </DragWrapper>
          ))}
      </DoneItemDropArea>
    </section>
  );
};

const mapState = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapState)(ClosedItems);
