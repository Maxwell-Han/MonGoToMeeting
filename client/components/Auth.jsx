import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import { Button, Box, FormField, TextInput } from "grommet";
import { Google } from "grommet-icons";
import history from "../history";

const AuthForm = (props) => {
  console.log("on authform props are ", props);
  const { name, displayName, handleSubmit, error } = props;
  const message =
    name === "login" ? "Log in as an existing user" : "Sign up as a new user";
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
        <Box
          border
          round
          gap="small"
          pad="small"
          hoverIndicator
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </Box>
        <Box
          border
          round
          gap="small"
          pad="small"
          hoverIndicator
          onClick={() => history.push("/login")}
        >
          Log In
        </Box>
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
        <p>{message}</p>
        <form onSubmit={handleSubmit} name={name}>
          {name === "signup" && (
            <FormField
              name="userName"
              htmlfor="userName"
              label="User Name"
              required
            >
              <TextInput id="userName" name="userName" />
            </FormField>
          )}
          <FormField name="email" htmlfor="email" label="Email" required>
            <TextInput id="email" name="email" />
          </FormField>
          <FormField name="password" htmlfor="password" label="password">
            <TextInput id="password" name="password" type="password" />
          </FormField>
          <div>
            <Button
              color="light-2"
              plain={false}
              hoverIndicator
              primary
              type="submit"
            >
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
      const userName = formName === 'login' ? '' : evt.target.userName.value
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
