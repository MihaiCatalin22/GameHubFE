import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import userService from '../services/UserService';
import UserList from './UserList';
import UserProfile from './UserProfile';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { hasRole } = useAuth();

  useEffect(() => {
    userService.getAllUsers()
      .then(response => {
        setUsers(response.data); 
      })
      .catch(error => {
        console.error("Fetching users failed:", error);
      });
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user); 
  };

  return (
    <div>
      <UserList users={users} onUserSelect={handleUserSelect} />
      {selectedUser && (hasRole('ADMINISTRATOR') || hasRole('COMMUNITY_MANAGER')) ? (
        <UserProfile user={selectedUser} />
      ) : (
        <p>No user selected or insufficient permissions to view details.</p>
      )}
    </div>
  );
};

export default UsersPage;