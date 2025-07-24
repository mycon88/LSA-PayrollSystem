// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) setUser(storedUser);
  }, []);

  // Login handler
  const loginUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  // Logout handler
  const logoutUser = () => {
    logout(); // optional backend logout
    localStorage.removeItem('user'); // ensure local cleanup
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
