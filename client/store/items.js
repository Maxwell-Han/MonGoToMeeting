import axios from "axios";
import history from "../history";
import socket from "../socket";
const cloneDeep = require("lodash/clonedeep");

// ACTION TYPES
const GET_MEETING_ITEMS = "GET_MEETING_ITEMS";
export const ADD_MEETING_ITEM = "ADD_MEETING_ITEM";
export const SET_FOCUS_ITEM = "SET_FOCUS_ITEM";
export const UNSET_FOCUS_ITEM = "UNSET_FOCUS_ITEM";
export const MARK_DONE_ITEM = "MARK_DONE_ITEM";
export const UPDATE_ITEM_RATING = "UPDATE_ITEM_RATING";
export const UPDATE_ITEM_VOTE = "UPDATE_ITEM_VOTE";
export const UPDATE_ITEM_TAGS = "UPDATE_ITEM_TAGS";
export const REMOVED_ITEM_TAG = "REMOVED_ITEM_TAG";

// ACTION CREATORS
export const gotItems = (items) => ({ type: GET_MEETING_ITEMS, items });
export const addedItem = (item) => ({ type: ADD_MEETING_ITEM, item });
export const haveSetFocusItem = (items) => ({ type: SET_FOCUS_ITEM, items });
export const haveUnsetFocusItem = (items) => ({ type: UNSET_FOCUS_ITEM, items });
export const markedDoneItem = (items) => ({ type: MARK_DONE_ITEM, items });
export const updatedItemRating = (item) => ({ type: UPDATE_ITEM_RATING, item });
export const updatedItemVote = (item) => ({ type: UPDATE_ITEM_VOTE, item });
export const updatedItemTag = (item) => ({ type: UPDATE_ITEM_TAGS, item });
export const removedItemTag = (item) => ({ type: REMOVED_ITEM_TAG, item });

// THUNK CREATORS
export const getItems = (roomId) => async (dispatch) => {
  try {
    console.log("thunk getting rooms from rom ", roomId);
    const { data } = await axios.get(`/api/rooms/${roomId}/items`);
    dispatch(gotItems(data));
  } catch (err) {
    console.error(err);
  }
};

export const addItem = (item) => async (dispatch) => {
  try {
    const { roomId } = item;
    const { data: newItem } = await axios.post(`/api/rooms/${roomId}/items`, item);
    socket.emit('DISPATCH_ITEM_ACTION', roomId, newItem, ADD_MEETING_ITEM)
  } catch (err) {
    console.error(err);
  }
};

// set focus on one item but get back all items
export const setFocusItem = (roomId, itemId) => async (dispatch) => {
  try {
    const { data: items } = await axios.put(
      `/api/rooms/${roomId}/items/${itemId}`,
      {
        inFocus: true,
        status: "open",
      }
    );
    socket.emit('DISPATCH_ITEM_ACTION', roomId, items, SET_FOCUS_ITEM)
  } catch (err) {
    console.error(err);
  }
};

export const unsetFocusItem = (roomId, itemId) => async (dispatch) => {
  try {
    const { data: items } = await axios.put(
      `/api/rooms/${roomId}/items/${itemId}`,
      {
        inFocus: false,
        status: "open",
      }
    );
    socket.emit('DISPATCH_ITEM_ACTION', roomId, items, UNSET_FOCUS_ITEM)
  } catch (err) {
    console.error(err);
  }
};

export const markItemDone = (roomId, itemId) => async (dispatch) => {
  try {
    const { data: items } = await axios.put(
      `/api/rooms/${roomId}/items/${itemId}`,
      {
        status: "closed",
        inFocus: false,
      }
    );
    socket.emit('DISPATCH_ITEM_ACTION', roomId, items, MARK_DONE_ITEM)
  } catch (err) {
    console.error(err);
  }
};

export const udpateItemRating = (roomId, itemId, rating) => async (
  dispatch
) => {
  try {
    const { data: item } = await axios.put(
      `/api/rooms/${roomId}/items/${itemId}/rating`,
      {
        rating: rating,
      }
    );
    socket.emit('DISPATCH_ITEM_ACTION', roomId, item, UPDATE_ITEM_RATING)
  } catch (err) {
    console.error(err);
  }
};

export const udpateItemVote = (roomId, itemId, userId, vote) => async (
  dispatch
) => {
  try {
    const { data: item } = await axios.put(
      `/api/rooms/${roomId}/items/${itemId}/vote`,
      {
        userId: userId,
        vote: vote,
      }
    );
    socket.emit('DISPATCH_ITEM_ACTION', roomId, item, UPDATE_ITEM_VOTE)
  } catch (err) {
    console.error(err);
  }
};

export const udpateItemTags = (roomId, itemId, tag) => async (dispatch) => {
  try {
    const {
      data: item,
    } = await axios.put(`/api/rooms/${roomId}/items/${itemId}/tag`, { tag });
    socket.emit('DISPATCH_ITEM_ACTION', roomId, item, UPDATE_ITEM_TAGS)
  } catch (err) {
    console.error(err);
  }
};

export const removeItemTags = (roomId, itemId, tag) => async (dispatch) => {
  console.log('args are from store ', roomId, itemId, tag)
  try {
    const {
      data: item,
    } = await axios.post(`/api/rooms/${roomId}/items/${itemId}/tag/delete`, { tag: tag });
    socket.emit('DISPATCH_ITEM_ACTION', roomId, item, REMOVED_ITEM_TAG)
  } catch (err) {
    console.error(err);
  }
};


// Initial State
const defaultItems = {};

// Reducer
export default function (state = defaultItems, action) {
  switch (action.type) {
    case GET_MEETING_ITEMS:
      return action.items;
    case ADD_MEETING_ITEM:
      return { ...state, [action.item._id]: action.item };
    case SET_FOCUS_ITEM:
      return action.items;
    case UNSET_FOCUS_ITEM:
      return action.items;
    case MARK_DONE_ITEM:
      return action.items;
    case UPDATE_ITEM_RATING: {
      let nextItems = cloneDeep(state);
      console.log("NEXT ITEMS ARE ", state);
      nextItems[action.item._id] = action.item;
      return nextItems;
    }
    case UPDATE_ITEM_VOTE: {
      let nextItems = cloneDeep(state);
      nextItems[action.item._id] = action.item;
      return nextItems;
    }
    case UPDATE_ITEM_TAGS: {
      let nextItems = cloneDeep(state);
      nextItems[action.item._id] = action.item;
      return nextItems;
    }
    case REMOVED_ITEM_TAG: {
      let nextItems = cloneDeep(state);
      nextItems[action.item._id] = action.item;
      return nextItems;
    }
    default:
      return state;
  }
}
