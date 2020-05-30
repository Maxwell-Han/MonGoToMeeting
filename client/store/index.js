import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user'
import rooms from './rooms'
import users from './users'
import buddies from './buddies'
import currentRoom from './currentRoom'
import currentRoomUsers from './currentRoomUsers'
// import currentRoomId from './currentRoomId'
// import currentItems from './currentItems'
import onlineUsers from './onlineUsers'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


const reducer = combineReducers({
  user,
  rooms,
  buddies,
  onlineUsers,
  users,
  // currentRoomId,
  currentRoom,
  currentRoomUsers,
  // currentItems
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './user'
export * from './rooms'
export * from './users'
export * from './buddies'
export * from './currentRoom'
export * from './currentRoomUsers'
// export * from './currentRoomId'
// export * from './currentItems'
export * from './onlineUsers'
