import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import UserList from './UserList';
import UserProfile from './UserProfile';

// const UsersPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Dummy users array for demonstration
//   const users = [
//     { id: 1, username: 'UserOne', email: 'userone@example.com' },
//     { id: 2, username: 'UserTwo', email: 'usertwo@example.com' },
//     { id: 3, username: 'UserThree', email: 'userthree@example.com' },
//   ];

//   const handleUserSelect = (user) => {
//     console.log('Selected user:', user);
//     setSelectedUser(user);
//   };

//   return (
//     <div>
//       <UserList users={users} onUserSelect={handleUserSelect} />
//       {selectedUser && <UserProfile user={selectedUser} />}
//     </div>
//   );
// };
const UsersPage = () => {
  // Hardcoded user data
  const hardcodedUser = {
    id: 1,
    username: "JohnDoe",
    email: "johndoe@example.com"
  };

  return (
    <div>
      <UserProfile user={hardcodedUser} />
    </div>
  );
};
export default UsersPage;