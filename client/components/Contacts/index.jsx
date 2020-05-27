import React, { useState } from "react";
import {
  Header,
  Heading,
  Button,
  Box,
  Layer,
  Text,
  FormField,
  TextInput,
} from "grommet";
import { UserAdd } from "grommet-icons";
const Contacts = () => {
  const [open, setOpen] = useState();
  const [searchText, setSearchText] = useState("");
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const onChange = (e) => {
    const { value: newValue } = event.target;
    setSearchText(newValue);
  };
  return (
    <section className="contactsContainer">
      <Header background="brand" height="xxsmall" elevation="medium">
        <h3>Contacts</h3>
        <Button plain icon={<UserAdd />} onClick={onOpen} />
      </Header>
      <div className="contact-list-container">
        <Box gap="xxsmall" direction="column">
          <ul>
            <li>contact name</li>
            <li>contact name</li>
            <li>contact name</li>
            <li>contact name</li>
          </ul>
        </Box>
      </div>
      {/* MODAL TO ADD CONTACT */}
      {open && (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              <Text>Add a Contact to the Room</Text>
            </Heading>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <FormField label="search">
                <TextInput onChange={onChange} />
              </FormField>
              <section>
                <ul>
                  <li>person</li>
                  <li>person</li>
                  <li>person</li>
                  <li>person</li>
                  <li>person</li>
                </ul>
              </section>
            </Box>
          </Box>
        </Layer>
      )}
    </section>
  );
};

export default Contacts;
