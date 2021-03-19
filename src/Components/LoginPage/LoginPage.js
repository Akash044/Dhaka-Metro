import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config"
import { Button, Card, Form } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {faGoogle} from '@fortawesome/fontawesome-free-brands';
import {Link} from 'react-router-dom'
import { useState } from 'react';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

const LoginPage = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedUser, setLoggedUser] = useContext(UserContext);

    const [logState, setLogState] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name:"",
        email:"",
        password:""
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
                console.log(loggedUser);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }
    const handleOnChange = (event) =>{
        console.log(event.target.name,event.target.value);
       setUserInfo( {...userInfo,[event.target.name]: event.target.value});
    }
    const handleSignUpWithEmailAndPassword = () =>{
      console.log(userInfo);

    }

    return (<>
        <Card className="mx-auto mt-5" style={{ width: '18rem' }}>
        <Card.Body >
            {
                (!logState)?<>
                    <Card.Title>Create an account</Card.Title>
                    <input type="text" className="mt-2" placeholder="Enter your name"/>
                    <input type="email"  className="mt-3" placeholder="Enter your email"/>
                    <input type="password" className="mt-3" placeholder="Choose password"/>
                    <input type="password"  className="mt-3" placeholder="Confirm password"/></>
                    :
                    <>
                    <Card.Title>Sign in</Card.Title>
                    <input type="email" name="email" onBlur={handleOnChange} className="mt-3" placeholder="Enter your email"/>
                    <input type="password" name="password" onBlur={handleOnChange} className="mt-3" placeholder="Choose password"/>
                    </>

                    
            }
            
               <Button type="submit" className="mt-4" onClick={handleSignUpWithEmailAndPassword} >{logState?"Sign in":"sign up"}</Button>
               <Card.Text>{!logState?"Already have an account?":"Didn't have an account?"}<a onClick={()=>setLogState(!logState)}>{!logState?"Sign in":"sign up"}</a></Card.Text>
            </Card.Body>
        </Card>
        <div className="d-flex justify-content-center mt-4">
            <Button onClick={handleGoogleSignIn}> <FontAwesomeIcon className ='font-awesome me-2' icon={faGoogle} />Continue with Google</Button> 
        </div>   
        </>
    );
};

export default LoginPage;