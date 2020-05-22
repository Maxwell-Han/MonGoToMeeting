import React, { useState, useReducer, createContext, useEffect } from "react";
// import Routes from './routes';
import { initialUser, userReducer, me } from "./store/reducer";
import Home from "./home";
import LoginForm from "./LoginForm";

export const DispatchContext = createContext(null);

const App = () => {
  const isPromise = (obj) => {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  };
  const middleware = (dispatch) => {
    return (action) => {
      if (isPromise(action.user)) {
        action.user.then((v) => {
          dispatch({ type: action.type, user: v });
        });
      } else {
        dispatch(action);
      }
    };
  };
  const [user, dispatchUser] = useReducer(userReducer, initialUser);
  const dispatch = (action) => [dispatchUser].forEach((fn) => fn(action));

  return (
    <DispatchContext.Provider value={{ user, dispatch : middleware(dispatch) }}>
      {/* <Routes /> */}
      <Home />
    </DispatchContext.Provider>
  );
};

export default App;
