import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import userService from '../services/UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { hasRole } = useAuth();  

  useEffect(() => {
    userService.getAllUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Failed to fetch users:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Users</h2>
      <input
        type="text"
        className="user-search-input"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="user-list">
        {filteredUsers.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            {hasRole('ADMINISTRATOR') && <button className='button'>Delete User</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
