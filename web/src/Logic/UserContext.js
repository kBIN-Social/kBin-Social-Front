import React, { createContext, useState , useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserContextProvider  = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const setAuthToken = async (newToken) => {
    setToken(newToken);
    try {
      const userData = await getUserData(newToken);
      setUser(userData);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    setAuthToken('e627487a714ca26a5128d9e5939e3f54d8ed90b2');
  }, []); 

  async function getUserData(token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/me`, {
    //const response = await fetch(`http://127.0.0.1:8000/api/v1/profile/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    console.log(`Token ${token} | User ${response.json()}`)
    return response.json();
  }

  return (
    <UserContext.Provider value={{ token, setAuthToken, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useToken = () => useContext(UserContext).token;
export const useUser = () => useContext(UserContext).user;
