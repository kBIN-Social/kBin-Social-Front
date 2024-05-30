import React, { useState, useEffect } from 'react';
import { useToken, useUser } from '../Logic/UserContext';
import { useParams } from 'react-router-dom';
import ThreadTemplate from '../Components/ThreadTemplate'
import OptionBar from '../Components/OptionBar';


function TokenSmall({ token }){
  return token ? <small>{`ApiKey: Token ${token}`}</small> : null;
}

function SearchThreads({user}) {
  const token = useToken();
  console.log(token)
  const authUser = useUser();
  const [userData, setUserData] = useState([]);
  const [threadsData, setThreads] = useState([]);
  const [filterState, setFilterState] = useState('all');
  const [orderState, setOrderState] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  
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
}, [user, token, searchQuery, filterState, orderState]);

async function getThreads(user, token) {
  const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/search?content=${searchQuery}order_by=${orderState}&filter_by=${filterState}`, {
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

const handleSearch = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const query = formData.get('q');
  setSearchQuery(query);
};

async function getThreads(user, token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/search?query=${searchQuery}&order_by=${orderState}&filter_by=${filterState}`, {
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
    <div className="section section--top">
      <div className="container">
      <form onSubmit={handleSearch}>
            <div className="flex" style={{ alignItems: 'center' }}>
              <input defaultValue="" type="text" name="q" className="form-control" placeholder="Escribir término de búsqueda" autoFocus />
              <button className="btn btn__primary" type="submit" aria-label="Búsqueda">
                Search 🔍
              </button>
            </div>
          </form>
      </div>
    </div>
    <OptionBar setOrderState={setOrderState} setFilterState={setFilterState} />
    {threadsData.length > 0 && (
      threadsData.map(thread => (
        <ThreadTemplate key={thread.id} thread={thread} user={user} />
      ))
    )}
  </div>
);
}

export default SearchThreads
