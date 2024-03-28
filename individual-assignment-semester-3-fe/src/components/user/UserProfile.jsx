import React from 'react';


const UserProfile = ({ user }) => {
  console.log("UserProfile received user:", user);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user has been selected.</p>
      )}
    </div>
  );
};
//   return (
//     <div>
//       <h2>User Profile</h2>
//       <p>Username: {user.username}</p>
//       <p>Email: {user.email}</p>
//     </div>
//   );
// };


export default UserProfile;