import React, { useState, useEffect } from 'react';
import { useToken} from '../Logic/UserContext';
//import { useUser } from '../Logic/UserContext';
import ThreadTemplate from './ThreadTemplate'
import OptionBar from './OptionBar';

/*function TokenSmall({ token }) {
  return token ? <small>{`ApiKey: Token ${token}`}</small> : null;
}*/

function SearchThreads({ user }) {
  const token = useToken();
  //const authUser = useUser();
  const [threadsData, setThreads] = useState([]);
  const [filterState, setFilterState] = useState('all');
  const [orderState, setOrderState] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState(''); // Para manejar el valor del input

  useEffect(() => {
    async function getThreads(user, token) {
      const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/threads/search?content=${searchQuery}&order_by=${orderState}&filter_by=${filterState}`, {
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
  }, [user, token, searchQuery, filterState, orderState]);


  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(inputValue); // Actualizar searchQuery con el valor del input
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Actualizar el valor del input
  };

  return (
    <div data-controller="subject-list" data-action="notifications:EntryCreatedNotification@window->subject-list#increaseCounter">
      <div className="section section--top">
        <div className="container">
          <form onSubmit={handleSearch}>
            <div className="flex" style={{ alignItems: 'center' }}>
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder="Escribir término de búsqueda"
                autoFocus
                value={inputValue} // Enlazar el valor del input con el estado
                onChange={handleInputChange} // Actualizar el estado cuando cambie el input
              />
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

export default SearchThreads;
