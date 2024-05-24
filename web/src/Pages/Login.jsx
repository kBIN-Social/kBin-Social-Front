import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

export default function Login() {
    const navigate = useNavigate();

    const handleSuccess = (response) => {
        console.log('Login Success:', response);
    };

    const handleFailure = (error) => {
        console.log('Login Failed:', error);
    };

    return (
       <div id = "login" >
        <Header/> 
        <GoogleOAuthProvider clientId="309867708903-7dttivbla5l5frlviq7u23fvlanf84uh.apps.googleusercontent.com ">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                />
            </div>
        </GoogleOAuthProvider>
        </div> 
    );
}