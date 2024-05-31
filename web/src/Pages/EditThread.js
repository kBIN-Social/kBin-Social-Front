import { useParams } from "react-router-dom";
import EditThreadForm from "../Components/EditThreadForm";
import Header from "../Components/Header";
import React from 'react';
import { useState, useEffect } from 'react';
import { useToken, useUser } from '../Logic/UserContext';
import ThreadTemplate from '../Components/ThreadTemplate';

function EditThread() {
    const { id } = useParams();
    const token = useToken();
    const authUser = useUser();
    const [threadsData, setThreads] = useState(null); // Inicializa como null
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const threadsData = await getThreads(token);
            setThreads(threadsData);
          } catch (error) {
            console.error('Error fetching threads:', error);
          }
        };
    
        if (token) {
          fetchData();
        }
      }, [token, forceUpdate]);
    
      async function getThreads(token) {
        const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching threads');
        }
        return response.json();
      }

    return (
        threadsData ? 
        <div className="theme--dark" data-controller="kbin notifications" data-turbo="false">
            <React.Fragment>
                <Header />
                <ThreadTemplate key={threadsData.id} thread={threadsData} updateThread={setForceUpdate} />
                <EditThreadForm threadId={id}/>
            </React.Fragment>
        </div>
        : <p>Loading...</p>
    );
}

export default EditThread;
