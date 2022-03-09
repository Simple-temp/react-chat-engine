import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';


const app = initializeApp(firebaseConfig);

const Login = () => {

    const provider = new GoogleAuthProvider();
    const fbprovider = new FacebookAuthProvider();

    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/chats";

    const SignInWithGoogle = () => {

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
            });
    }

    
    const SignInWithFacebook = () => {

        const auth = getAuth();
        signInWithPopup(auth, fbprovider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
            });
    }

    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome react chat app</h2>
                <div className='login-button google' onClick={SignInWithGoogle}>
                    <GoogleOutlined /> Sign In With Google
                </div>
                {/* <br />
                <br />
                <div className='login-button facebook' onClick={SignInWithFacebook}>
                    <FacebookOutlined /> Sign In With Facebook
                </div> */}
            </div>
        </div>
    );
};

export default Login;