import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'


import Welcome from './components/Welcome';




function App() {
  return (
    <div class="h-100 p-3 mb-2 bg-light text-dark">
      <Router>
        <Welcome />
      </Router>
    </div>
  );
}

export default App;
