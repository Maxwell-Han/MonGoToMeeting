import React from "react";
import { ItemTypes } from "../../constants";
import { useDrag } from "react-dnd";

const FocusItemCard = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, data: { ...props.item } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <section opacity={isDragging ? 0.5 : 1}>
        <h5>{props.name}</h5>
        <section>
          <div>
            <p>Description: {props.description}</p>
            <p>Item status: {props.status}</p>
          </div>
          <div>
            <h6>Votes</h6>
          </div>
          <div>
            <h6>Score</h6>
          </div>
        </section>
      </section>
    </div>
  );
};

export default FocusItemCard;
