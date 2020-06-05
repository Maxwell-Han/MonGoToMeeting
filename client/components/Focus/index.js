import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Header, Button, Box } from "grommet";
import DropAreaFocus from "./DropAreaFocus";
import { FocusItemDragWrapper } from "../DragAndDrop";
import FocusItemCard from "../Card/FocusItemCard";

const Focus = (props) => {
  const { items } = props;
  const inFocusItems = Object.keys(items).filter(
    (id) => items[id].inFocus === true
  );
  console.log("in focus items are ", inFocusItems);
  return (
    <section className="focus-container">
      <div>Current Item(s)</div>
      <DropAreaFocus>
        {!!inFocusItems.length &&
          inFocusItems.map((id) => (
            <FocusItemDragWrapper key={id} item={items[id]}>
              <FocusItemCard item={items[id]} />
            </FocusItemDragWrapper>
          ))}
      </DropAreaFocus>
    </section>
  );
};

const mapState = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapState)(Focus);
