import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import { Button, Box, FormField, TextInput, Text } from "grommet";
import { Google } from "grommet-icons";
import history from "../history";
import SocialIcons from "./TopMenu/SocialIcons";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const message =
    name === "login" ? "Log in as an existing user" : "Sign up as a new user";
  return (
    <section className="auth-container">
      <p className="title">
        <Text color="brand" className="title-text">
          MONGOTOMEETING
        </Text>
      </p>
      <Box
        pad="small"
        align="center"
        round
        gap="small"
        background={{ color: "light-2", opacity: "strong" }}
        style={{ width: "fit-content" }}
      >
        <Box direction="row" className="auth-selection">
          <Button
            hoverIndicator
            active={displayName === "Sign Up"}
            onClick={() => history.push("/signup")}
            label="Sign Up"
          />
          <Button
            hoverIndicator
            active={displayName === "Login"}
            onClick={() => history.push("/login")}
            label="Log In"
          />
        </Box>
        <Button
          icon={<Google color="plain" />}
          label="Log in with Google"
          href="/auth/google"
          color="active"
          primary={true}
        />
        <div style={{ display: "flex" }}>
          <hr className="horizontalRule" />
          <span>OR</span>
          <hr className="horizontalRule" />
        </div>
        <div>{message}</div>
        <form onSubmit={handleSubmit} name={name} className="auth-form">
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
          <FormField name="password" htmlfor="password" label="Password">
            <TextInput id="password" name="password" type="password" />
          </FormField>

          <Button
            color="accent-4"
            plain={false}
            hoverIndicator
            primary
            type="submit"
          >
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </Box>
      <div>
        <SocialIcons />
      </div>
    </section>
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
      const userName = formName === "login" ? "" : evt.target.userName.value;
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
