import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Home from './Components/Home/Home';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ChooseRoute from './Components/ChooseRoute/ChooseRoute';
import LoginPage from './Components/LoginPage/LoginPage';
import { createContext } from 'react';
import { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import navImg from "./images/Group 33141.png";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  let history = useHistory();
  console.log("app ", user);
  const handleLogOut = () => {
    setUser({});

  }
  const login = () => {
    history.replace('/login')
  }

  return (
    <div className="bg-text bg-transparent home-page">
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Navbar className="container" variant="light">
            <Navbar.Brand as={Link} to="/home"><img
              src={navImg}
              width="60"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
            <Nav className="mr-auto text-left">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link href="#features">Destination</Nav.Link>
              <Nav.Link href="#pricing">Blog</Nav.Link>
              <Nav.Link href="#pricing">Contact</Nav.Link>
              <Navbar.Brand> <img src={user.photoURL}
                width="60"
                height="50"
                style={{ borderRadius: "40px" }}
                className="d-inline-block align-top"
                alt="" /> </Navbar.Brand>
              <Nav.Link href="#pricing"> <h5>{user.displayName}</h5> </Nav.Link>
              <Button onClick={user.email ? handleLogOut : ""} type="submit">{user.email ? "Log out" : "sign in"}</Button>
            </Nav>

          </Navbar>

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
    </div>


  );
}

export default App;
