import React, { useState, useReducer, useContext, createContext } from "react";
import { DispatchContext, userReducer } from "./reducer";

const DispatchContext = createContext(null);

const initialUser = {};

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

export default { DispatchContext, initialUser, userReducer };
