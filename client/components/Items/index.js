import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItems } from "../../store";
import { Header, Text } from "grommet";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../constants";

const DragWrapper = (props) => {
  const { item } = props;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, data: {...item} },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="temp-list-item"
      style={{
        display: isDragging ? 'none' : 'block',
        cursor: "move",
      }}
    >
      {item.name}
    </div>
  );
};

const Items = (props) => {
  const { getItems, items, currentRoom } = props;
  return (
    <section className="items-container">
      <Header>
        <h4>Meeting Items</h4>
      </Header>
      <div className="items-list">
        {!!Object.keys(items).length &&
          Object.keys(items).map((id) => (
            <DragWrapper key={id} item={items[id]} />
          ))}
      </div>
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
