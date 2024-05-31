import React, { useState, useEffect } from 'react';
import { useToken} from '../Logic/UserContext';
//import { useUser } from '../Logic/UserContext';
import ThreadTemplate from './ThreadTemplate';
import OptionBar from './OptionBar';

function ThreadContent({ user }) {
  const token = useToken();
  //const authUser = useUser();
  const [threadsData, setThreads] = useState([]);
  const [filterState, setFilterState] = useState('all');
  const [orderState, setOrderState] = useState('recent');
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
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
    const fetchData = async () => {
      try {
        const threadsData = await getThreads(user, token);
        setThreads(threadsData);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [user, token, filterState, orderState, forceUpdate]);


  
  return (
    <div data-controller="subject-list" data-action="notifications:EntryCreatedNotification@window->subject-list#increaseCounter">
      <OptionBar setOrderState={setOrderState} setFilterState={setFilterState} />
      {threadsData.length > 0 && (
        threadsData.map(thread => (
          <ThreadTemplate key={thread.id} thread={thread} updateThread={setForceUpdate} />
        ))
      )}
    </div>
  );
}

export default ThreadContent;
