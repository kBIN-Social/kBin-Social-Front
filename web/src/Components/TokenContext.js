// TokenContext.js
import React, { createContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setAuthToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => React.useContext(TokenContext);
