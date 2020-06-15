import axios from "axios";
import history from '../history';
import socket from '../socket'

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

// ACTION CREATORS
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
    socket.emit('GET_USER', res.data)
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  userName,
  email,
  password,
  method,
) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      userName,
      email,
      password,
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/home");
    socket.emit('GET_USER', res.data)
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    socket.emit('logout')
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultUser = {};

// Reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
