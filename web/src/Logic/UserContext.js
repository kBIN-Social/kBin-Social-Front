import React, { createContext, useState , useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserContextProvider  = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const setAuthToken = async (newToken) => {
    setToken(newToken);
    try {
      const userData = await getUserData(newToken);
      console.log(userData)
      setUser(userData);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    setAuthToken('bd6c1e7602d2a0a1551abb5386ec262d4b382276');
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
    <UserContext.Provider value={{ token, setAuthToken, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useToken = () => useContext(UserContext).token;
export const useUser = () => useContext(UserContext).user;
