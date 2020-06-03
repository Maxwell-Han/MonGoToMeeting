import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Header, Button, Box } from "grommet";
import DropAreaFocus from "./DropAreaFocus";
import FocusItemCard from "./FocusItemCard";

const Focus = (props) => {
  const { items } = props;
  const inFocusItems = Object.keys(items).filter(
    (id) => items[id].inFocus === true
  );
  console.log("in focus items are ", inFocusItems);
  return (
    <section className="focus-container">
      <Header>
        <h4>Current Item(s)</h4>
      </Header>
      <DropAreaFocus>
        {!!inFocusItems.length &&
          inFocusItems.map((id) => (
            <FocusItemCard key={id} item={items[id]}>
              {items[id].name}
            </FocusItemCard>
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
