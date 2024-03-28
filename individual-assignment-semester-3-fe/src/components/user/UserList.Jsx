import React, { useState, useEffect } from 'react';
import userService from '../services/UserService'; 

const UserList = ({ users, onUserSelect }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserSelect(user)} style={{ cursor: 'pointer' }}>
          {user.username}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
