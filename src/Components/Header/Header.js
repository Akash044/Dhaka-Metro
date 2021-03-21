import './Header.css'
import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../App';
import navImg from "../../images/header-logo.png";
import userIcon from '../../images/empty-img-icon.png'

const Header = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    let history = useHistory();
    // console.log("app ", loggedUser);
    const handleLogOut = () => {
        setLoggedUser({});
        history.push("/")
    }

    return (

        <Navbar className="container bg-white" expand="lg">
            <Navbar.Brand as={Link} to="/home"><img src={navImg} className="d-inline-block align-top nav-img"alt=""/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/route">Destination</Nav.Link>
                <Nav.Link href="#pricing">Blog</Nav.Link>
                <Nav.Link href="#pricing">Contact</Nav.Link>
                    <Navbar.Brand> 
                        <img src={loggedUser.photoURL ? loggedUser.photoURL : userIcon} className="d-inline-block align-top user-img" alt="" />
                    </Navbar.Brand>
                    <Nav.Link href="#pricing"> <h5>{loggedUser.displayName}</h5> </Nav.Link>
                    {
                        loggedUser.email ?
                            <Button onClick={handleLogOut} type="submit">Log out</Button>
                            :
                            <Button as={Link} to="/login" type="submit">Sign in</Button>

                    }

            </Navbar.Collapse>
        </Navbar>

    );
};

export default Header;