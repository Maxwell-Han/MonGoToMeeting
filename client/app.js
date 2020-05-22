import React from 'react';
// import Routes from './routes';
import { DispatchContext, initialUser, userReducer } from './store/reducer';
import Home from "./home";
import LoginForm from './LoginForm'

const App = () => {
  const [user, dispatchUser] = userReducer(userReducer, initialUser)
  const dispatch = action => [dispatchUser].forEach(fn => fn(action))
  return (
    <DispatchContext.Provider value={dispatch}>
      {/* <Routes /> */}
      <LoginForm />
    </DispatchContext.Provider>
  );
};

export default App;
