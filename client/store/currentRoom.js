import axios from "axios";
import history from "../history";
import socket from "../socket";
import { resettedBuddies } from "./currentRoomUsers";

// ACTION TYPES
const GET_MESSAGES = "GET_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";
const SET_CURRENT_ROOM_ID = "SET_CURRENT_ROOM_ID";
const REMOVE_CURRENT_ROOM = "REMOVE_CURRENT_ROOM";

// ACTION CREATORS
const gotMessages = (messages) => ({ type: GET_MESSAGES, messages });
export const addedMessage = (message) => ({ type: ADD_MESSAGE, message });
export const setRoom = (roomId) => ({ type: SET_CURRENT_ROOM_ID, roomId });
export const removeRoom = (roomId) => ({ type: REMOVE_CURRENT_ROOM, roomId });

// THUNK CREATORS
export const getMessages = (roomId) => async (dispatch) => {
  try {
    const { data: messages } = await axios.get(`/api/rooms/${roomId}/messages`);
    dispatch(gotMessages(messages));
  } catch (err) {
    console.error(err);
  }
};

export const addMessage = (roomId, message) => async () => {
  try {
    const { data } = await axios.post(`/api/rooms/${roomId}`, message);
    // ../socket.js will dispatch
    socket.emit("ADD_MESSAGE", data);
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultRoom = {
  messages: [],
  roomId: "",
};

// Reducer
export default function (state = defaultRoom, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM_ID:
      return { ...state, roomId: action.roomId };
    case GET_MESSAGES:
      return { ...state, messages: action.messages };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    case REMOVE_CURRENT_ROOM: {
      if (state.roomId !== action.roomId) return state;
      else {
        return defaultRoom;
      }
    }
    default:
      return state;
  }
}
