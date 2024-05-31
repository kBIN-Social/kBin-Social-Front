import ProfileContent from "../Components/ProfileContent";
//import ProfileHead from "../Components/ProfileHead";
import Header from "../Components/Header";
import { useToken} from '../Logic/UserContext';
//import {useUser } from '../Logic/UserContext';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Profile() {
    const token = useToken();
    const { id } = useParams();
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUserData(token) {
            const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error('Error fetching user data');
            }
            return response.json();
        }
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(token, id);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        if (token) {
            fetchUserData();
        }
    }, [token, id]);
    

    return (
        <div className="theme--dark" data-controller="kbin notifications" data-turbo="false">  
            {user && (
                <React.Fragment>
                    <Header />
                    <ProfileContent user={user} />
                </React.Fragment>
            )}
        </div>
      );
    }

export default Profile;