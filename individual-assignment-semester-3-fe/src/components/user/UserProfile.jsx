import React from 'react';

const UserProfile = ({ user }) => {
    if (!user) {
        return <div>No user has been selected.</div>;
    }

    return (
        <div>
            <h2> User Profile </h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;