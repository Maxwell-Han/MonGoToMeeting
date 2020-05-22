import React, { useEffect, useContext } from "react";
import "./index.css";
import { DispatchContext } from "./app";
import { me } from "./store/reducer";

const Home = () => {
  const {user, dispatch} = useContext(DispatchContext);
  console.log('user is ', user , ' dispatch is ', typeof dispatch, dispatch)
  useEffect(() => {
    console.log("using useEffect");
    dispatch(me());
  }, []);

  return (
    <div>
      <h4>Welcome to the home page</h4>
      <h3>You have been logged in!</h3>
    </div>
  );
};

export default Home;
