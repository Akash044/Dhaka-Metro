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
import { useForm } from "react-hook-form";
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [logState, setLogState] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: "",
        errorMessage: ""
    })

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    console.log(from);


    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user1 = result.user;
                setLoggedUser(user1);
                history.replace(from);
                // console.log(loggedUser);
            }).catch((error) => {
                // const errorMessage = error.message;
                // console.log(errorMessage);
            });

    }
    const handleOnChange = (event) => {
        console.log(event.target.name, event.target.value);
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }
    const handleSignUpWithEmailAndPassword = (data) => {
        // console.log("clicked");
        firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newUserInfo = { ...userInfo };
                newUserInfo.errorMessage = "";
                newUserInfo.successMessage = "Account is successfully created! Go to login page"
                setUserInfo(newUserInfo);
                console.log("user create ", user);
            })
            .catch((error) => {
                const newUserInfo = { ...userInfo };
                newUserInfo.successMessage = "";
                newUserInfo.errorMessage = error.message;
                setUserInfo(newUserInfo);
            });

    }
    const handleSignInWithEmailAndPassword = () => {
        firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoggedUser(user);
                const newUserInfo = { ...userInfo };
                newUserInfo.errorMessage = "";
                newUserInfo.successMessage = "Account is successfully created! Go to login page"
                setUserInfo(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = { ...userInfo };
                newUserInfo.successMessage = "";
                newUserInfo.errorMessage = error.message;
                setUserInfo(newUserInfo);
            });

    }

    return (<div className="p-5 bg">
        <Card className="mx-auto mt-5 ps-3 shadow" style={{ width: '20rem' }}>
            <Card.Body className="" >
                <form onSubmit={handleSubmit(!logState ? handleSignUpWithEmailAndPassword : handleSignInWithEmailAndPassword)} className="m-2">
                    {
                        (!logState) ?
                            <>
                                <Card.Title>Create an account</Card.Title>
                                <input name="name" placeholder="Enter name" className="mt-2" onBlur={handleOnChange} ref={register} />
                                <input name="email" placeholder="Enter email" className="mt-2" onBlur={handleOnChange} ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} /><br />
                                {errors.email && <span className="text-danger">Enter valid email</span>}
                                <input type="password" name="password" placeholder="Enter password" className="mt-2" onBlur={handleOnChange} ref={register({ required: true, minLength: 6, pattern: /\d{1}/ })} /><br />
                                {errors.password && <span className="text-danger">Enter atleast one digit(minlength 6)</span>}
                                <input type="password" name="confirmPassword" placeholder="confirmPassword" className="mt-2" onBlur={handleOnChange} ref={register({ required: true, minLength: 6 })} /><br />
                                {errors.confirmPassword && <span className="text-danger">Doesn't match</span>}<br />

                            </>
                            :
                            <>
                                <Card.Title>Sign in</Card.Title>
                                <input name="email" placeholder="Enter email" className="mt-2" onBlur={handleOnChange} ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
                                <br />
                                {errors.email && <span className="text-danger">Enter valid email</span>}
                                <input type="password" name="password" placeholder="Enter password" className="mt-2" onBlur={handleOnChange} ref={register({ required: true, pattern: /\d{1}/ })} /><br />
                                {errors.password && <span className="text-danger">Required</span>}<br />
                            </>


                    }
                    <input type="submit" className="bg-primary text-white rounded m-2"/> 
                     {/* onClick={!logState ? handleSignUpWithEmailAndPassword : handleSignInWithEmailAndPassword} />  */}
                    {/* <Button type="submit" className="mt-4" onClick={!logState ? handleSignUpWithEmailAndPassword : handleSignInWithEmailAndPassword} >{logState ? "Sign in" : "sign up"}</Button> */}
                </form>
                <Card.Text>{!logState ? "Already have an account?" : "Didn't have an account?"}<button className="btn info text-primary" onClick={() => {
                    setLogState(!logState);
                    const newUserInfo = { ...userInfo };
                    newUserInfo.successMessage = "";
                    newUserInfo.errorMessage = "";
                    setUserInfo(newUserInfo);
                }}>{!logState ? "Sign in" : "sign up"}</button></Card.Text>
                <h5 className="bg-success rounded text-white">{userInfo.successMessage} </h5>
                <h5 className="bg-warning rounded text-dark">{userInfo.errorMessage}</h5>

            </Card.Body>
        </Card>
        <div className="d-flex justify-content-center mt-4">

            <Button onClick={handleGoogleSignIn}> <FontAwesomeIcon className='font-awesome me-2' icon={faGoogle} />Continue with Google</Button>
        </div>
    </div>
    );
};

export default LoginPage;