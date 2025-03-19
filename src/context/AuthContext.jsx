import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
    }
  }, []);

  const login = (token) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ adminToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;