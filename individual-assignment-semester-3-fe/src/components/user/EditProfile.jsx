import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import userService from '../services/UserService';
import FileService from '../services/FileService';
import Modal from '../Modal';
import ProfilePictureUpload from './ProfilePictureUpload';

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
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleProfilePictureUpload = () => {
        if (!profilePicture) {
            setModalMessage('Please select a profile picture to upload!');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
            return;
        }
        
        const formData = new FormData();
        formData.append('file', profilePicture);
        FileService.uploadProfilePicture(formData, user.id)
            .then(response => {
                setModalMessage('Profile picture uploaded successfully');
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    updateUserDetails({ ...user, profilePicture: URL.createObjectURL(profilePicture) });
                }, 2000);
            })
            .catch(error => {
                setModalMessage('Failed to upload profile picture');
                setShowModal(true);
                setTimeout(() => setShowModal(false), 2000);
                console.error('Upload error:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateUser(user.id, formData);
            navigate('/profile');
            setModalMessage('Profile updated successfully!');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
        } catch (error) {
            console.error("Failed to update profile:", error);
            setModalMessage('Failed to update profile. Please try again.');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
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
                <ProfilePictureUpload 
                    userId={user.id} 
                    onProfilePictureUploaded={(data) => {
                        updateUserDetails({ ...user, profilePicture: data.url });
                    }} 
                />
                </div>
                <button type="submit" className='edit-profile-button'>Update Profile</button>
                {showModal && <Modal isOpen={showModal} title="Notification">
                {modalMessage}
            </Modal>}
            </form>
        </div>
    );
};

export default EditProfile;