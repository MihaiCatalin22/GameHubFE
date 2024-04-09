import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/UserService';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      userService.getUserById(userId)
        .then(response => setUser(response.data))
        .catch(error => console.error("Failed to fetch user:", error));
    }
  }, [userId]);

  if (!user) {
    return <div>No user selected</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      {/* ... other user details */}
    </div>
  );
};

export default UserProfile;