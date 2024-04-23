import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/UserService';

const UserDetailPage = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userId) {
      userService.getUserById(userId)
        .then(response => {
          setUserDetails(response.data);
        })
        .catch(error => console.error("Failed to fetch user details:", error));
    }
  }, [userId]);

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }


  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userDetails.username}</p>
     {/*{hasRole('ADMINISTRATOR') && <p>Email: {user.email}</p>} */}
      <p>Bio: {userDetails.description}</p>
    </div>
  );
};

export default UserDetailPage;