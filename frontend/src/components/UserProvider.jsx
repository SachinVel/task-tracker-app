import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState('Hello');

  const setUserToken = (newToken) => {
    setToken(newToken);
  };

  const unsetUserToken = () => {
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, setUserToken, unsetUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;