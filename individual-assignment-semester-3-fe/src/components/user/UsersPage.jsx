import React, { useState, useEffect } from 'react';
import userService from '../services/UserService';
import UserList from './UserList';
import UserProfile from './UserProfile';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    userService.getAllUsers()
      .then(response => {
        setUsers(response.data); // This should be an array of user objects
        console.log("Users fetched successfully:", response.data);
      })
      .catch(error => {
        console.error("Fetching users failed:", error);
      });
  }, []);

  const handleUserSelect = (user) => {
    console.log("User selected:", user);
    setSelectedUser(user); // Ensure the user object is being set here
  };

  // Log the state right before rendering for debugging purposes
  console.log("Current users state:", users);
  console.log("Current selectedUser state:", selectedUser);

  return (
    <div>
      <UserList users={users} onUserSelect={handleUserSelect} />
      {/* Render UserProfile only if selectedUser is not null */}
      {selectedUser ? <UserProfile user={selectedUser} /> : <p>No user selected</p>}
    </div>
  );
};

export default UsersPage;