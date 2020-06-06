import axios from "axios";
import history from "../history";
import socket from "../socket";
import cloneDeep from "lodash/cloneDeep";

// ACTION TYPES
const IS_TYPING = "IS_TYPING";
const STOP_TYPING = "STOP_TYPING";

// ACTION CREATORS
export const didType = (userName) => ({ type: IS_TYPING, userName });
export const stoppedTyping = (userName) => ({ type: STOP_TYPING, userName });

// THUNK CREATORS
export const isTyping = (roomId, userName) => (dispatch) => {
  {
    try {
      socket.emit("TYPING", roomId, userName);
    } catch (error) {
      console.log(error);
    }
  }
};

export const stopTyping = (roomId, userName) => (dispatch) => {
  {
    try {
      socket.emit("STOP_TYPING", roomId, userName);
    } catch (error) {
      console.log(error);
    }
  }
};
// Initial State
const defaultNames = {};

// Reducer
export default function (state = defaultNames, action) {
  switch (action.type) {
    case IS_TYPING: {
      let nextUsers = cloneDeep(state);
      if (!(action.userName in nextUsers)) {
        nextUsers[action.userName] = true;
      }
      return nextUsers;
    }
    case STOP_TYPING: {
      let nextUsers = cloneDeep(state);
      delete nextUsers[action.userName];
      return nextUsers;
    }
    default:
      return state;
  }
}
