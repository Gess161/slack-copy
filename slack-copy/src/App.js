import './App.css';
import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'

import Header from './components/Header';
import SignUp from './components/SignUp'



function App() {
  return (
    <div className="App">
      <Header />
      <div className="container d-flex align-items-center flex-column">
        <Switch>
          <Route exact path="/"
            component={SignUp}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
