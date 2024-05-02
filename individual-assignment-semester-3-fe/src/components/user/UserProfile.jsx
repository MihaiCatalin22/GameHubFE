import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import userService from '../services/UserService';
import ProfilePictureUpload from './ProfilePictureUpload';

const UserProfile = () => {
  const { userId } = useParams();
  const { user, hasRole } = useAuth();

  const [profilePicture, setProfilePicture] = useState(user.profilePicture ? `http://localhost:8080/images/${user.profilePicture}` : 'http://localhost:8080/images/default_image.jpg');


  useEffect(() => {
    if (!user) {
      console.error("No user found in context");
    }
  }, [user]);

  const handleProfilePictureUploaded = (updatedUser) => {
    setProfilePicture(`http://localhost:8080/images/${updatedUser.profilePicture}`);
  };

  if (!user) {
    return <div>No user selected</div>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <img src={profilePicture} alt="Profile" className="profile-picture"/>
      <p>Username: {user.username}</p>
      {hasRole('ADMINISTRATOR') && <p>Email: {user.email}</p>}
      <p>Bio: {user.description}</p>
      <ProfilePictureUpload userId={user.id} onProfilePictureUploaded={handleProfilePictureUploaded} />
    </div>
  );
};

export default UserProfile;