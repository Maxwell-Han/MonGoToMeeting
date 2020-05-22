import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import LoginForm from "./LoginForm";
import store from "./store";
import Home from "./home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./app";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("app"));
