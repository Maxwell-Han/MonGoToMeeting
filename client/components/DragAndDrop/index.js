import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ItemTypes } from "../../constants";
import tempImage from '../grommet-card.png'

const DragWrapper = (props) => {
  const { item } = props;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.CARD, data: { ...item } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {props.children}
    </div>
  );
};

export const FocusItemDragWrapper = (props) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.CARD, data: { ...props.item } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={tempImage} />
      <div ref={drag}>{props.children}</div>
    </>
  );
};

export default DragWrapper;
