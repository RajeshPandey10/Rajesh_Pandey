import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { adminToken } = useContext(AuthContext);

  if (!adminToken) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;