import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [loading, setLoading] = useState(true);

  const roleBasedRedirect = (userData) => {
    if (userData.role === "client") navigate("/client-dashboard");
    else if (userData.role === "freelancer") navigate("/freelancer-dashboard");
    else if (userData.role === "tradeperson") navigate("/tradeperson-dashboard");
  };


  useEffect(() => {
    const initializeAuth = async () => {
      const loggedInUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");

      if (loggedInUser && accessToken) {
        const userInfo = JSON.parse(loggedInUser);
        setUser(userInfo);
        setToken(accessToken);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);


  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');

    if (loggedInUser && accessToken) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);


  const loggedIn = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    setUser(userData);
    setToken(localStorage.getItem('accessToken'));
  };

  const logout = () => {
    console.log('Logout')
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loggedIn, logout, loading, roleBasedRedirect }}>
      {children}
    </AuthContext.Provider>
  );
}
