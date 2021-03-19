import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Home from './Components/Home/Home';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ChooseRoute from './Components/ChooseRoute/ChooseRoute';
import LoginPage from './Components/LoginPage/LoginPage';
import { createContext } from 'react';
import { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

import Header from './Components/Header/Header';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  
  return (
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <LoginPage></LoginPage>
            </Route>
            <PrivateRoute path="/route">
              <ChooseRoute></ChooseRoute>
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
