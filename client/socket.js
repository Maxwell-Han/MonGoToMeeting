import io from "socket.io-client";
import store, {
  addedMessage,
  addedBuddyToRoom,
  getRooms,
  createdRoom,
  gotConnectedBuddy,
  gotDisconnectedBuddy,
  ADD_MEETING_ITEM,
  addedItem,
  haveSetFocusItem,
  SET_FOCUS_ITEM,
  haveUnsetFocusItem,
  UNSET_FOCUS_ITEM,
  MARK_DONE_ITEM,
  markedDoneItem,
  UPDATE_ITEM_RATING,
  updatedItemRating,
  UPDATE_ITEM_VOTE,
  updatedItemVote,
  UPDATE_ITEM_TAGS,
  updatedItemTag,
  REMOVED_ITEM_TAG,
  removedItemTag,
  removeRoom,
  resettedBuddies,
  resettedItems, didType, stoppedTyping
} from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("client socket connected");
});

socket.on("ADD_MESSAGE", (message) => {
  store.dispatch(addedMessage(message));
});

socket.on("ADD_BUDDY_TO_ROOM", (buddy) => {
  console.log("client recieved event to add buddy ", buddy);
  console.log("socket here is ", socket.id, socket);
  // store.dispatch(addedBuddyToRoom(buddy))
});

socket.on("CREATE_ROOM", (room) => {
  console.log("Client Socket dispatching createdRoom ", room);
  store.dispatch(createdRoom(room));
});

socket.on("GET_ROOMS", (userId) => {
  console.log("client recieved event to add buddy ");
  store.dispatch(getRooms(userId));
});

socket.on("GOT_CONNECTED_BUDDY", (id) => {
  console.log("your buddy ", id, " has just connected!");
  store.dispatch(gotConnectedBuddy(id));
});

socket.on("REMOVE_CURRENT_ROOM", (roomId) => {
  let currentRoomId = store.getState().currentRoom.roomId;
  if (currentRoomId === roomId) {
    store.dispatch(resettedBuddies());
    store.dispatch(resettedItems());
  }
  store.dispatch(removeRoom(roomId));
});

socket.on("GOT_DISCONNECTED_BUDDY", (id) => {
  console.log("got disconnected buddy alert");
  store.dispatch(gotDisconnectedBuddy(id));
});

socket.on("JOIN_ROOMS", (user) => {
  socket.emit("GET_USER", user);
  console.log(user, " is going to join the new rooom they were added to");
});

socket.on("TYPING", (roomId, userName) => {
  store.dispatch(didType(userName))
});

socket.on("STOP_TYPING", (roomId, userName) => {
  store.dispatch(stoppedTyping(userName))
});

socket.on("DISPATCH_ITEM_ACTION", (itemOrItems, actionType) => {
  switch (actionType) {
    case ADD_MEETING_ITEM:
      store.dispatch(addedItem(itemOrItems));
      break;
    case SET_FOCUS_ITEM:
      store.dispatch(haveSetFocusItem(itemOrItems));
      break;
    case UNSET_FOCUS_ITEM:
      console.log("UNSET FOCUS ITEM");
      store.dispatch(haveUnsetFocusItem(itemOrItems));
      break;
    case MARK_DONE_ITEM:
      store.dispatch(markedDoneItem(itemOrItems));
      break;
    case UPDATE_ITEM_RATING:
      store.dispatch(updatedItemRating(itemOrItems));
      break;
    case UPDATE_ITEM_VOTE:
      store.dispatch(updatedItemVote(itemOrItems));
      break;
    case UPDATE_ITEM_TAGS:
      store.dispatch(updatedItemTag(itemOrItems));
      break;
    case REMOVED_ITEM_TAG:
      store.dispatch(removedItemTag(itemOrItems));
      break;
    default:
      break;
  }
});

export default socket;

//CONFIG SOCKET OPTION
// const configureSocket = dispatch => {
//   // make sure our socket is connected to the port
//   socket.on("connect", () => {
//     console.log("client socket connected");
//   });

//   // the socket.on method is like an event listener
//   // just like how our redux reducer works
//   // the different actions that our socket/client will emit
//   // is catched by these listeners
//   socket.on("ADD_MESSAGE", message => {
//     console.log("Client socket caught add message from server");
//     dispatch({ type: "ADD_MESSAGE", message });
//   });

//   return socket;
// };

// export default configureSocket;

// export const initSocket = dispatch => {
//   console.log('initializing SOCKET')
//   socket.on('connect', () => {
//     console.log('Connected!')
//   })

//   socket.on('ADD_MESSAGE', message => {
//     console.log('Client socket caught add message from server')
//     dispatch({type: 'ADD_MESSAGE', message})
//   })
// }

// socket.on('ADD_MESSAGE', message => {
//   console.log('testing client socket')

// })
