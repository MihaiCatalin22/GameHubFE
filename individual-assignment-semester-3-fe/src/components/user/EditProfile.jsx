import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import userService from '../services/UserService';
import FileService from '../services/FileService';


const EditProfile = () => {
    const { user, updateUserDetails } = useAuth();
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email || '',
        description: user.description || '',
        privacy: user.privacy || 'Public', 
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateUser(user.id, formData);
            
            if (profilePicture) {
                const formData = new FormData();
                formData.append('file', profilePicture);
                await FileService.uploadProfilePicture(formData, user.id);
            }

            updateUserDetails({
                ...user,
                ...formData,
                profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : user.profilePicture
            });

            navigate('/profile');
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="edit-profile-container">
            <h2 className="edit-profile-title">Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className='edit-profile-form'>
                <div>
                    <label htmlFor="username" className="edit-profile-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="edit-profile-input"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="edit-profile-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="edit-profile-input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="edit-profile-label">Bio:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="edit-profile-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div>
                    <label htmlFor="privacy" className="edit-profile-label">Privacy Settings:</label>
                    <select id="privacy" name="privacy" className="edit-profile-select" value={formData.privacy} onChange={handleChange}>
                        <option value="Public">Public</option>
                        <option value="FriendsOnly">Friends Only</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="profilePicture" className="edit-profile-label">Profile Picture:</label>
                    <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        className="file-upload-input"
                        onChange={handleProfilePictureChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit" className='edit-profile-button'>Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;