import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminData");

    if (token) {
      setAdminToken(token);
      setIsAuthenticated(true);
      if (userData) {
        setAdminData(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminData", JSON.stringify(userData));
    setAdminToken(token);
    setAdminData(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove specific admin items
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    // Clear all localStorage (complete logout)
    localStorage.clear();

    // Reset all auth states
    setAdminToken(null);
    setAdminData(null);
    setIsAuthenticated(false);

    // Force page reload to ensure complete state reset
    window.location.href = "/";
  };

  const value = {
    isAuthenticated,
    adminToken,
    adminData,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// (Removed all admin panel references. This file is now deprecated and not used in the new minimal portfolio.)
export default AuthContext;
