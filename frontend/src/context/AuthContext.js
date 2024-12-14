import { refreshAccessToken } from "../utils/api";
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = localStorage.getItem('accessToken');
    
    if (loggedInUser && accessToken) {
      setUser(loggedInUser);
    }
  }, []);
  

  const loggedIn = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      const newToken = await refreshAccessToken();
      if (!newToken) logout();
    }, 15 * 60 * 1000); // Refresh every 15 minutes
    logout();

    return () => clearInterval(refreshTokenInterval);
  }, []);
  return (
    <AuthContext.Provider value={{ user, loggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
