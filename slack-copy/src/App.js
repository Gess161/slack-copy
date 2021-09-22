import './App.css';
import React, {useEffect, useState}from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'

import Header from './components/Header';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'
import PrivateRoute from './utils/PrivateRoute';
import Chat from './components/Chat'
import AlertComponent from './components/Alert'
import Page404 from './components/Page404';
import {io} from "socket.io-client"

const socket = io('http://localhost:4001/')

function App() {
  const [title, updateTitle] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)
  return (
    <div className="App">
      <div className="container d-flex h-100 align-items-center flex-column">  
      <Header title={title}/>
        <Switch>
          <Route exact path="/">
            <SignUp showError={updateErrorMessage} updateTitle={updateTitle}/>
          </Route>
          <Route path="/login">
            <LogIn showError={updateErrorMessage} updateTitle={updateTitle}/>
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
}

export default App;
