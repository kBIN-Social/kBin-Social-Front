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
    setAuthToken('e155590df0f27f14e097efe6c93c2f7333ec4012');
  }, []); 

  async function getUserData(token) {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/profile/me`, {
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

  if (user) {
    return (
      <UserContext.Provider value={{ token, setAuthToken, user }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    return null;
  }
};

export const useToken = () => useContext(UserContext).token;
export const useUser = () => useContext(UserContext).user;
