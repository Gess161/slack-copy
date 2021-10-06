import "./stylesheets/styles.css"
import React, { useState } from 'react'
import { Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'
import PrivateRoute from './utils/PrivateRoute';
import Chat from './components/Chat';
import AlertComponent from './components/Alert'
import Page404 from './components/Page404';
import { io } from "socket.io-client";
import { WEB_SOCKET_URL } from './constants';

const socket = io(WEB_SOCKET_URL)
function App() {
  const [errorMessage, updateErrorMessage] = useState(null)
  return (
    <div className="App">
      <div className="wrapper">
        <Switch>
          <Route exact path="/">
            <SignUp showError={updateErrorMessage} />
          </Route>
          <Route path="/login">
            <LogIn showError={updateErrorMessage} />
          </Route>
          <PrivateRoute path="/chat">
            <Chat
              socket={socket} />
          </PrivateRoute>
          <Route exact path="*">
            <Page404 />
          </Route>
        </Switch>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
      </div>
    </div>
  );
};

export default App;
