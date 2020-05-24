import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import { Button, Box, FormField, TextInput } from "grommet";
import { Google } from "grommet-icons";

const AuthForm = (props) => {
  console.log("on authform props are ", props);
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div>
      <Box
        pad="large"
        align="center"
        background={{ color: "light-2", opacity: "strong" }}
        round
        gap="small"
        width="large"
      >
        <h4>Welcome to MonGoToMeeting!</h4>
        <Button
          icon={<Google color="plain" />}
          label="Log in with Google"
          href="/auth/google"
        />
        <div style={{ display: "flex" }}>
          <hr
            style={{
              width: 130,
              borderColor: "#0C62C1",
              display: "inline-block",
            }}
          />{" "}
          <span>OR</span>
          <hr
            style={{
              width: 130,
              borderColor: "#0C62C1",
              display: "inline-block",
            }}
          />
        </div>
        <p>Auth message to sign in or sign up</p>
        <form onSubmit={handleSubmit} name={name}>
          <FormField name="userName" htmlfor="userName" label="User Name">
            <TextInput id="userName" name="userName" />
          </FormField>
          <FormField name="email" htmlfor="email" label="email">
            <TextInput id="email" name="email" />
          </FormField>
          <FormField name="password" htmlfor="password" label="password">
            <TextInput id="password" name="password" type="password" />
          </FormField>
          <div>
            <Button color="light-2" primary type="submit">
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </Box>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      console.log("handling submit ", evt.target.name);
      const formName = evt.target.name;
      const userName = evt.target.userName.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(userName, email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
