import React, { useState } from "react";
import { connect } from "react-redux";
import { Header, Box, Button, TextInput, extendDefaultTheme } from "grommet";
import { Send} from "grommet-icons";
import { base } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { logout } from "../../store";

extendDefaultTheme(
  deepMerge(base, {
    global: {
      input: {
        weight: "normal",
      },
    },
  })
);

const Chat = (props) => {
  const [userMessage, setMessage] = useState("");
  return (
    <Box fill>
      <Header background="brand" height="xxsmall">
        <h4>Chat Menu goes here</h4>
      </Header>
      <Box basis="3/4">
        <h4>Chat messages go here</h4>
      </Box>
      <Box>
        <TextInput
          value={userMessage}
          onChange={(e) => setMessage(e.target.value)}
        ></TextInput>
        <div>
          <Button plain={false} icon={<Send size="small" />}  onClick={() => {}} />
        </div>
      </Box>
    </Box>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Chat);
