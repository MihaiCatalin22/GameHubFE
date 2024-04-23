import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../components/services/UserService';
import axios from 'axios';


const AuthContext = createContext(undefined);

const updateAxiosToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUserData = sessionStorage.getItem('user');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setIsAuthenticated(true);
        setUser(userData);
        updateAxiosToken(userData.token);
      }
    }, []);
  
    const loginUser = async (userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        updateAxiosToken(userData.token);
    };
  
    const logoutUser = () => {
      sessionStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      updateAxiosToken(null);
    };
  
    const updateUserDetails = async (userData) => {
      try {
        const response = await userService.updateUser(userData.id, userData);
        const updatedUser = {...userData, ...response.data, token: response.data.jwt || userData.token};
        setUser(updatedUser);
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        updateAxiosToken(updatedUser.token);
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    };
    const hasRole = (rolesRequired) => {
      if (!Array.isArray(rolesRequired)) {
          rolesRequired = [rolesRequired]; 
      }
      return rolesRequired.some(role => user?.role?.includes(role));
  };
    return (
      <AuthContext.Provider value={{ isAuthenticated, user, setUser, loginUser, logoutUser, updateUserDetails, hasRole }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };