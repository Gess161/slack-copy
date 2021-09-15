import './App.css';
import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'

import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp'
import LogIn from './components/LogIn';


function App() {
  return (
      <div class="h-100 p-3 mb-2 bg-light text-dark">
        <NavBar />
        <Switch>
          <Route exact path="/"
          component={Welcome}
          />
          <Route path="/reg"
          component={SignUp}
                      />
          <Route path="/auth"
          component={LogIn}
                      />
        </Switch>
      </div>
  );
}

export default App;
