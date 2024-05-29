import React, { useState, useEffect } from 'react';
import { useToken, useUser } from '../Logic/UserContext';
import { useParams } from 'react-router-dom';
import ThreadTemplate from '../Components/ThreadTemplate'
import OptionBar from '../Components/OptionBar';


function TokenSmall({ token }){
  return token ? <small>{`ApiKey: Token ${token}`}</small> : null;
}

function ThreadContent({user}) {
  const token = useToken();
  console.log(token)
  const authUser = useUser();
  const [userData, setUserData] = useState([]);
  const [threadsData, setThreads] = useState([]);
  const [filterState, setFilterState] = useState('all');
  const [orderState, setOrderState] = useState('recent');
  
  useEffect(() => {
    const fetchData = async () => {

        try {
          const threadsData = await getThreads(user, token);
          setThreads(threadsData);
        } catch (error) {
          console.error('Error fetching threads:', error);
        }
    }
    if (token) {
        fetchData();
    }
    console.log(user)
    console.log(authUser)
}, [user, token, filterState, orderState]);

async function getThreads(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads?order_by=${orderState}&filter_by=${filterState}`, {
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
  <div data-controller="subject-list" data-action="notifications:EntryCreatedNotification@window->subject-list#increaseCounter">
    <OptionBar setOrderState={setOrderState}/>
    {threadsData.length > 0 && (
        threadsData.map(thread => (
          <ThreadTemplate key={thread.id} thread={thread} user={user} />
        ))
      )}
  </div>
  );
}

export default ThreadContent
