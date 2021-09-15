import './App.css';
import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'

import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp';


function App() {
  return (
      <div class="h-100 p-3 mb-2 bg-light text-dark">
        <NavBar />
        <Switch>
          <Route exact path="/"
          component={Welcome}
          />
          <Route path="/reg"
          component={LogIn}
                      />
          <Route path="/auth"
          component={SignUp}
                      />
        </Switch>
      </div>
  );
}

export default App;
