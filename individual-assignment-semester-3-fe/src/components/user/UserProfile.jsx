import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import userService from '../services/UserService';

const UserProfile = () => {
  const { userId } = useParams();
  const { user, hasRole } = useAuth();

  useEffect(() => {
    if (!user) {
      console.error("No user found in context");
    }
  }, [user]);

  if (!user) {
    return <div>No user selected</div>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <p>Username: {user.username}</p>
      {hasRole('ADMINISTRATOR') && <p>Email: {user.email}</p>}
      <p>Bio: {user.description}</p>
    </div>
  );
};

export default UserProfile;