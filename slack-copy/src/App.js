import './App.css';
import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'

import Header from './components/Header';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'
import PrivateRoute from './utils/PrivateRoute';



function App() {
  return (
    <div className="App">
      <Header />
      <div className="container d-flex align-items-center flex-column">
        <Switch>
          <Route exact path="/"
            component={SignUp}
          />
          <Route exact path="/login"
            component={LogIn}
          />
          <PrivateRoute path="/chat">
              {/* <Chat /> */}
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
}

export default App;
