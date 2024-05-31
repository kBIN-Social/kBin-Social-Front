import React, { createContext, useState , useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const UserContext = createContext();

export const UserContextProvider  = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null)

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [token1, setToken1] = useState(null);
  const [user1, setUser1] = useState(null);

  const [token2, setToken2] = useState(null);
  const [user2, setUser2] = useState(null);

  const [token3, setToken3] = useState(null);
  const [user3, setUser3] = useState(null);

  const setCurrUser = (index) => {
    if (index === 1) {
      setUser(user1);
      setToken(token1);
      setCurrentUserId(1)
    } else if (index === 2) {
      setUser(user2);
      setToken(token2);
      setCurrentUserId(2)
    } else {
      setUser(user3);
      setToken(token3);
      setCurrentUserId(3)
    }
  };

  const setUser1Token = async (newToken) => {
    setToken(newToken);
    setToken1(newToken);
    try {
      const userData = await getUserData(newToken);
      console.log(userData)
      setUser(userData);
      setUser1(userData);  
    } catch (error) {
      console.error('Error fetching user data 1:', error);
    }
  };

  const setUser2Token = async (newToken) => {
    setToken2(newToken);
    try {
      const userData = await getUserData(newToken);
      console.log(userData)
      setUser2(userData);
    } catch (error) {
      console.error('Error fetching user data 1:', error);
    }
  };

  const setUser3Token = async (newToken) => {
    setToken3(newToken);
    try {
      const userData = await getUserData(newToken);
      setUser3(userData);
    } catch (error) {
      console.error('Error fetching user data 1:', error);
    }
  };

  useEffect(() => {
    setUser1Token('bf5b989610f5c531d9b7fa2d4eb0b4fbb6acbc1e');
    setUser2Token('5c19068fa00265a05d52e497606a31c279658f7e');
    setUser3Token('5c19068fa00265a05d52e497606a31c279658f7e');
    setCurrentUserId(1)
  }, []); 

  async function getUserData(token) {
    const response = await fetch(`https://asw-kbin.azurewebsites.net/api/v1/profile/me`, {
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

  return (
    <UserContext.Provider value={{ token, setCurrUser, user, currentUserId}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => useContext(UserContext).currentUserId
export const useToken = () => useContext(UserContext).token;
export const useUser = () => useContext(UserContext).user;
