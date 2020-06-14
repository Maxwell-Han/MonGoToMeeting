import axios from "axios";
import history from "../history";
import user from "./user";
import socket from "../socket";

// ACTION TYPES
const GET_ROOM_MEMBERS = "GET_ROOM_MEMBERS";
const ADD_BUDDY_TO_ROOM = "ADD_BUDDY_TO_ROOM";
const DELETE_USER_FROM_ROOM = "DELETE_USER_FROM_ROOM";
const RESET_CURRENT_BUDDIES = "RESET_CURRENT_BUDDIES";

// ACTION CREATORS
const gotMembers = (members) => ({ type: GET_ROOM_MEMBERS, members });
export const addedBuddyToRoom = (buddy) => ({ type: ADD_BUDDY_TO_ROOM, buddy });

const deletedUserFromRoom = (users) => ({
  type: DELETE_USER_FROM_ROOM,
  users,
});

export const resettedBuddies = () => ({
  type: RESET_CURRENT_BUDDIES,
});

// THUNK CREATORS
export const getMembers = (roomId) => async (dispatch) => {
  try {
    const { data: members } = await axios.get(`/api/rooms/${roomId}/users`);
    dispatch(gotMembers(members));
  } catch (err) {
    console.error(err);
  }
};

//add buddy to room and user's buddy list
export const addBuddyToRoom = (roomId, buddyId) => async (dispatch) => {
  try {
    const { data: buddy } = await axios.put(`/api/rooms/${roomId}/user`, {
      userId: buddyId,
    });
    socket.emit(ADD_BUDDY_TO_ROOM, buddy);
    dispatch(addedBuddyToRoom(buddy));
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserFromRoom = (roomId, userId) => async (dispatch) => {
  try {
    const { data: users } = await axios.delete(
      `/api/rooms/${roomId}/${userId}`
    );
    socket.emit("REMOVED_BUDDY_FROM_ROOM", roomId, userId);
    dispatch(deletedUserFromRoom(users));
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultMembers = {};

// Reducer
export default function (state = defaultMembers, action) {
  switch (action.type) {
    case GET_ROOM_MEMBERS:
      return action.members;
    case ADD_BUDDY_TO_ROOM:
      return { ...state, [action.buddy._id]: action.buddy };
    case DELETE_USER_FROM_ROOM:
      return action.users;
    case RESET_CURRENT_BUDDIES:
      return defaultMembers;
    default:
      return state;
  }
}
