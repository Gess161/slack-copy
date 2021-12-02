import "./stylesheets/styles.css"
import React from 'react'
import { Switch, Route} from 'react-router-dom';
import SignUp from "./routes/signup";
import LogIn from "./routes/login"
import PrivateRoute from './utils/PrivateRoute';
import Chat from "./routes/chat/index"
import Page404 from './components/Page404';


function App() {
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
            <Chat />
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
