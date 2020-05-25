import React from "react";
import { Header, Button } from "grommet";
import { UserAdd } from "grommet-icons";
const Contacts = () => {
  console.log('RENDERING CONTACTS SECTIONS~!!!')
  return (
    <>
      <Header background="brand" height="xxsmall" elevation="medium">
        <h3>Contacts</h3>
        <Button plain icon={<UserAdd />} onClick={() => {}} />
      </Header>
      <p>hello world</p>
    </>
  );
};

export default Contacts;
