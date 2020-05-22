import axios from "axios";
// import history from '../history';
// import socket from '../socket'

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = async dispatch => {
  console.log('running me function')
  try {
    const res = await axios.get("/auth/me");
    console.log('getting user via me ', res.data, dispatch)
    return getUser(res.data || initialUser);
    // socket.emit('GET_USER', res.data)
  } catch (err) {
    console.error(err);
  }
};

export const initialUser = {};

export const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

// export default {initialUser, userReducer}
