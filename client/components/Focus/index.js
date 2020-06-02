import React, { useState } from "react";
import { connect } from "react-redux";
import { setFocusItem } from "../../store";
import { Header, Button, Box } from "grommet";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import DropAreaFocus from "./DropAreaFocus";
import { useEffect } from "react";

const Focus = (props) => {
  const { items } = props;
  const inFocusItems = Object.keys(items).filter(
    (id) => items[id].inFocus === true
  );
  console.log('in focus items are ', inFocusItems)
  return (
    <section className="focus-container">
      <Header>
        <h4>Current Item(s)</h4>
      </Header>
      <DropAreaFocus>
        {!!inFocusItems.length &&
          inFocusItems.map((id) => (
            <div key={id}>{items[id].name}</div>
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
