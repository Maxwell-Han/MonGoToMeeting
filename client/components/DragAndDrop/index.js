import React, { useEffect } from "react";
import { Header, Text } from "grommet";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../constants";

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
      style={{
        display: isDragging ? "none" : "block",
        cursor: "move",
      }}
    >
      {props.children}
    </div>
  );
};

export const FocusItemDragWrapper = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, data: { ...props.item } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      {props.children}
    </div>
  );
};

export default DragWrapper
