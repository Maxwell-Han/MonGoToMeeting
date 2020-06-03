import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Header, Button, Box } from "grommet";
import DoneItemDropArea from "./DoneItemDropArea";

const ClosedItems = (props) => {
  const { items } = props;
  const inFocusItems = Object.keys(items).filter(
    (id) => !items[id].inFocus && items[id].status === 'closed'
  );
  console.log("done items are ", inFocusItems);
  return (
    <section className="items-container">
      <Header>
        <h4>Done Items</h4>
      </Header>
      <DoneItemDropArea>
        {!!inFocusItems.length &&
          inFocusItems.map((id) => (
            <div>{items[id].name}</div>
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
