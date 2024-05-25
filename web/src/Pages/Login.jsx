import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        console.log('Login Success:', response);
        const token = response.credential;

        try {
            const res = await axios.post('/api/auth/google/', { token });
            console.log('Backend response:', res.data);
            // Assuming res.data contains user information and token
            // You can store the user info and token as needed
            // navigate('/dashboard'); // Redirect to a protected route
        } catch (error) {
            console.error('Error authenticating with backend:', error);
        }
    };

    const handleFailure = (error) => {
        console.log('Login Failed:', error);
    };


    return (
       <div id = "login" >
        <Header/> 
        <GoogleOAuthProvider clientId="309867708903-7dttivbla5l5frlviq7u23fvlanf84uh.apps.googleusercontent.com">
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