import "./stylesheets/styles.css/styles.css"
import React from 'react'
import { Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'
import PrivateRoute from './utils/PrivateRoute';
import Chat from "./routes/chat/index"
import Page404 from './components/Page404';
import { io } from "socket.io-client";
import { WEB_SOCKET_URL } from './constants';

const socket = io(WEB_SOCKET_URL)
function App() {
  console.log(Chat)
  console.dir(Chat)
  return (
    <div className="App">
      <div className="wrapper">
        <Switch>
          <Route exact path="/">
            <SignUp/>
          </Route>
          <Route path="/login">
            <LogIn/>
          </Route>
          <PrivateRoute path="/chat">
            <Chat socket={socket}/>
          </PrivateRoute>
          <Route exact path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
