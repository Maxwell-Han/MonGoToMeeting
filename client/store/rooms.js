import axios from "axios";
import history from "../history";
import socket from "../socket";

// ACTION TYPES
const GET_ROOMS = "GET_ROOMS";
const CREATE_ROOM = "CREATE_ROOM";
const DELETE_ROOM = "DELETE_ROOM";

// ACTION CREATORS
export const gotRooms = (rooms) => ({ type: GET_ROOMS, rooms });
export const createdRoom = (room) => ({ type: CREATE_ROOM, room });
const deletedRoom = (roomId) => ({ type: DELETE_ROOM, roomId });

// THUNK CREATORS
export const getRooms = (userId) => async (dispatch) => {
  try {
    const { data: rooms } = await axios.get(`/api/users/${userId}/rooms`);
    dispatch(gotRooms(rooms));
  } catch (err) {
    console.error(err);
  }
};

export const createRoom = (roomName, ownerId) => async (dispatch) => {
  try {
    const data = { roomName, ownerId };
    const res = await axios.post("/api/rooms", data);
    socket.emit(CREATE_ROOM, res.data);
    dispatch(createdRoom(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/rooms/${roomId}`);
    dispatch(deletedRoom(roomId));
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultRooms = {};

// Reducer
export default function (state = defaultRooms, action) {
  switch (action.type) {
    case GET_ROOMS:
      return action.rooms;
    case CREATE_ROOM:
      return { ...state, [action.room._id]: action.room };
    case DELETE_ROOM: {
      let prevState = {...state}
      delete prevState[action.roomId]
      return prevState
    }
    default:
      return state;
  }
}
