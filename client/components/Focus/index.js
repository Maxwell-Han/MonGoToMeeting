import React from 'react';
import { Header, Button, Box } from "grommet";

const Focus = () => {
  return (
    <section className="focus-container">
      <Header>
        <h4>Current Item(s)</h4>
      </Header>
      <div className="focus-items-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    </section>
  );
}

export default Focus;
