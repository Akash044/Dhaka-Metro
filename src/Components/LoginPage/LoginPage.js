import './LoginPage.css';
import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config"
import { Button, Card } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/fontawesome-free-brands';
import { Link } from 'react-router-dom'
import { useState } from 'react';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

const LoginPage = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedUser, setLoggedUser] = useContext(UserContext);

    const [logState, setLogState] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user1 = result.user;
                setLoggedUser(user1);
                history.replace(from);
                // console.log(loggedUser);
            }).catch((error) => {
                const errorMessage = error.message;
                // console.log(errorMessage);
            });

    }
    const handleOnChange = (event) => {
        console.log(event.target.name, event.target.value);
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }
    const handleSignUpWithEmailAndPassword = () => {
        // console.log(userInfo);
        firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((userCredential) => {
                var user = userCredential.user;
                // console.log("user create ", user);
            })
            .catch((error) => {
                var errorMessage = error.message;
                // console.log(errorMessage);
            });

    }
    const handleSignInWithEmailAndPassword = () => {
        // console.log(userInfo);
        firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((userCredential) => {
                var user = userCredential.user;
                setLoggedUser(user);
                // console.log(from);
                history.replace(from);
                // console.log("sign in successfully", user);
            })
            .catch((error) => {
                var errorMessage = error.message;
                // console.log(errorMessage);
            });

    }

    return (<div className="p-5 bg">
        <Card className="mx-auto mt-5 ps-3 shadow" style={{ width: '18rem' }}>
            <Card.Body className="" >
                {
                    (!logState) ?
                        <>
                            <Card.Title>Create an account</Card.Title>
                            <input type="text" name="name" className="mt-2" onBlur={handleOnChange} placeholder="Enter your name" />
                            <input type="email" name="email" className="mt-3" onBlur={handleOnChange} placeholder="Enter your email" />
                            <input type="password" name="password" className="mt-3" onBlur={handleOnChange} placeholder="Choose password" />
                            <input type="password" className="mt-3" placeholder="Confirm password" />
                        </>
                        :
                        <>
                            <Card.Title>Sign in</Card.Title>
                            <input type="email" name="email" onBlur={handleOnChange} className="mt-3" placeholder="Enter your email" />
                            <input type="password" name="password" onBlur={handleOnChange} className="mt-3" placeholder="Choose password" />
                        </>


                }

                <Button type="submit" className="mt-4" onClick={!logState ? handleSignUpWithEmailAndPassword : handleSignInWithEmailAndPassword} >{logState ? "Sign in" : "sign up"}</Button>
                <Card.Text>{!logState ? "Already have an account?" : "Didn't have an account?"}<Link onClick={() => setLogState(!logState)}>{!logState ? "Sign in" : "sign up"}</Link></Card.Text>
            </Card.Body>
        </Card>
        <div className="d-flex justify-content-center mt-4">
            <Button onClick={handleGoogleSignIn}> <FontAwesomeIcon className='font-awesome me-2' icon={faGoogle} />Continue with Google</Button>
        </div>
    </div>
    );
};

export default LoginPage;