import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';


const UserProfile = () => {
  const { userId } = useParams();
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(user.profilePicture ? `http://localhost:8080/images/${user.profilePicture}` : 'http://localhost:8080/images/default_image.jpg');

  useEffect(() => {
    if (!user) {
      console.error("No user found in context");
    }
  }, [user]);
  
  const handleProfilePictureUploaded = (updatedUser) => {
    setProfilePicture(`http://localhost:8080/images/${updatedUser.profilePicture}`);
  };
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };
  if (!user) {
    return <div>No user selected</div>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <img src={profilePicture} alt="Profile" className="profile-picture"/>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Bio: {user.description}</p>
      <button onClick={handleEditProfile} className="button">Edit Profile</button>
    </div>
  );
};

export default UserProfile;