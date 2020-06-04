import React, { useState } from "react";
import { Box, Button, Keyboard, TextInput, Text } from "grommet";
import { FormClose } from "grommet-icons";

const TagEl = ({ children, onRemove, ...rest }) => {
  const tag = (
    <Box
      direction="row"
      align="center"
      background="brand"
      pad={{ horizontal: "xsmall", vertical: "xxsmall" }}
      margin={{ vertical: "xxsmall" }}
      round="medium"
      {...rest}
    >
      <Text size="xsmall" margin={{ right: "xxsmall" }}>
        {children}
      </Text>
      {onRemove && <FormClose size="small" color="white" />}
    </Box>
  );

  if (onRemove) {
    return <Button onClick={onRemove}>{tag}</Button>;
  }
  return tag;
};

const TagInput = ({ value = [], onAdd, onChange, onRemove, ...rest }) => {
  const [currentTag, setCurrentTag] = React.useState("");
  const [box, setBox] = React.useState();
  const boxRef = React.useCallback(setBox, []);

  const updateCurrentTag = (event) => {
    setCurrentTag(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const onAddTag = (tag) => {
    if (onAdd) {
      onAdd(tag);
    }
  };

  const onEnter = () => {
    if (currentTag.length) {
      onAddTag(currentTag);
      setCurrentTag("");
    }
  };

  const renderValue = () =>
    value.map((v, index) => (
      <TagEl
        margin="xxsmall"
        key={`${v}${index + 0}`}
        onRemove={() => onRemove(v)}
      >
        {v}
      </TagEl>
    ));

  return (
    <>
      <Box direction="row" wrap>{value.length > 0 && renderValue()}</Box>
      <Keyboard onEnter={onEnter}>
        <Box
          direction="row"
          align="center"
          pad={{ horizontal: "xsmall" }}
          border="all"
          ref={boxRef}
          wrap
        >
          <Box flex style={{ minWidth: "120px" }}>
            <TextInput
              type="search"
              plain
              dropTarget={box}
              {...rest}
              onChange={updateCurrentTag}
              value={currentTag}
              onSelect={(event) => {
                event.stopPropagation();
                onAddTag(event.suggestion);
              }}
            />
          </Box>
        </Box>
      </Keyboard>
    </>
  );
};

const TagForm = () => {
  const allSuggestions = [
    "all-star",
    "safe pair of hands",
    "outstanding",
    "needs improvement",
    "must do",
    "maybe",
    "in progress",
  ];

  const [selectedTags, setSelectedTags] = useState(["foo", "sony"]);
  const [suggestions, setSuggestions] = useState(allSuggestions);

  const onRemoveTag = (tag) => {
    const removeIndex = selectedTags.indexOf(tag);
    const newTags = [...selectedTags];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    setSelectedTags(newTags);
  };

  const onAddTag = (tag) => setSelectedTags([...selectedTags, tag]);

  const onFilterSuggestion = (value) =>
    setSuggestions(
      allSuggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );

  return (
    <Box pad="small">
      <TagInput
        placeholder="Add a tag..."
        suggestions={suggestions}
        value={selectedTags}
        onRemove={onRemoveTag}
        onAdd={onAddTag}
        onChange={({ target: { value } }) => onFilterSuggestion(value)}
      />
    </Box>
  );
};

export default TagForm;
