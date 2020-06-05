import React from "react";
import { Box } from "grommet";

const ItemCard = (props) => {
  const { item } = props;
  const { defaultView } = item;
  return (
    <Box
      fill
      direction="row"
      align="center"
      justify="between"
      elevation="medium"
    >
      <p>{item.name}</p>
      <div className="item-card-display">
        {defaultView === "rating" ? (
          <Rating item={item} />
        ) : (
          <Votes item={item} />
        )}
      </div>
    </Box>
  );
};

const Votes = ({ item }) => {
  const votesYes = item.votes.filter((el) => el === "yes");
  const votesNo = item.votes.length - votesYes;
  return (
    <>
      <div>{`Y: ${votesYes}`}</div>
      <div>{`N: ${votesNo}`}</div>
    </>
  );
};

const Rating = ({ item }) => {
  const rating = item.rating ? item.rating : 'TBD'
  return (
    <>
      <div>{`Rating: ${rating}`}</div>
    </>
  );
};

export default ItemCard;
