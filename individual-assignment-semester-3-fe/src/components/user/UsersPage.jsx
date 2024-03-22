import React, { useState } from 'react';
import UserList from './UserList';
import UserProfile from './UserProfile';

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <UserList onUserSelect={setSelectedUser} />
      <UserProfile user={selectedUser} />
    </div>
  );
};

export default UsersPage;