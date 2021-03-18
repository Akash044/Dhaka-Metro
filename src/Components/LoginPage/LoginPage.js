import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config"
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

const LoginPage = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [user, setUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
           
     
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user1 = result.user;
                setUser(user1);
                history.replace(from);
                console.log(user);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }

    return (
        <div>
            <Button onClick={handleGoogleSignIn} className="info">Log In</Button>
        </div>
    );
};

export default LoginPage;