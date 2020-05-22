import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

function dummyReducer(state = [], action) {
  switch (action.type) {
    case "one":
      return state;
    case "two":
      return state;
    default:
      return state;
  }
}

const store = createStore(
  dummyReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
