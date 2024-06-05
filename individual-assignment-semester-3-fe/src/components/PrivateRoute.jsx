import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const PrivateRoute = ({ children, isAllowed = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAllowed.length > 0 && (!user || !user.roles.some(role => isAllowed.includes(role)))) {
    alert("Access denied.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
