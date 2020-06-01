import React, {useEffect} from "react";
import { connect } from "react-redux";
import { getItems } from "../../store";
import { Header, Text } from "grommet";

const Items = (props) => {
  const { getItems, items, currentRoom } = props;

  return (
    <section className="items-container">
      <Header>
        <h4>Meeting Items</h4>
      </Header>
      <div className="items-list">
        {!!Object.keys(items).length &&
          Object.keys(items).map((id) => <li>{items[id].name}</li>)}
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
