import React, { useState } from "react";
import { Box, Button, Keyboard, TextInput, Meter, Stack, Text } from "grommet";
import {
  Clear,
  Checkmark,
  Scorecard,
  Checkbox,
  Tag,
  FormClose,
} from "grommet-icons";
import { TagForm, RateForm, VoteForm } from './FocusActions';

const FocusItemCard = (props) => {
  const { item } = props;
  const { defaultView } = item;
  const [view, setView] = useState(defaultView);
  const handleView = (view) => {
    setView(view);
  };
  return (
    <Box
      fill
      direction="column"
      align="center"
      justify="between"
      elevation="xlarge"
      className="focus-item-card"
    >
      <p>{item.name}</p>
      <Box direction="row">
        <Button
          plain
          icon={<Scorecard />}
          primary={view === "rating"}
          onClick={() => handleView("rating")}
        />
        <Button
          plain
          icon={<Checkbox />}
          primary={view === "votes"}
          onClick={() => handleView("votes")}
        />
        <Button
          plain
          icon={<Tag />}
          primary={view === "tags"}
          onClick={() => handleView("tags")}
        />
      </Box>
      {view === "rating" ? (
        <RateForm item={item} />
      ) : view === "votes" ? (
        <VoteForm item={item} />
      ) : (
        <TagForm item={item} />
      )}
    </Box>
  );
};

const Tags = ({ item }) => {
  const rating = item.rating ? item.rating : "TBD";
  return (
    <>
      <div>Rating</div>
      <TextInput
        value={rating}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
};

export default FocusItemCard;
