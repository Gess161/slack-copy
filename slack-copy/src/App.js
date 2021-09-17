import './App.css';
import React, {useState}from 'react'
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


function App() {
  const [title, updateTitle] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)
  return (
    <div className="App">
      <div className="container d-flex align-items-center flex-column">
      <Header title={title}/>  
        <Switch>
          <Route exact path="/">
            <SignUp showError={updateErrorMessage} updateTitle={updateTitle}/>
          </Route>
          <Route exact path="/signup">
            <SignUp showError={updateErrorMessage} updateTitle={updateTitle}/>
          </Route>
          <Route exact path="/login">
            <LogIn showError={updateErrorMessage} updateTitle={updateTitle}/>
          </Route>
          <PrivateRoute path="/chat">
              <Chat />
          </PrivateRoute>
        </Switch>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
      </div>
    </div>
  );
}

export default App;
