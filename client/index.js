import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import history from "./history";
import { Router, Switch, Route, Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./app";
import "./index.css";
import "./socket";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);
