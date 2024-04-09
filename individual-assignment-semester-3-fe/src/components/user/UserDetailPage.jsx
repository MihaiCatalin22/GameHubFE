import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/UserService';

const UserDetailPage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    userService.getUserById(userId)
      .then(response => setUser(response.data))
      .catch(error => console.error("Failed to fetch user:", error));
  }, [userId]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default UserDetailPage;