import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import userService from '../services/UserService';

const EditProfile = () => {
    const { user, updateUserDetails } = useAuth();
    const [formData, setFormData] = useState({
        username: user.username,
        description: user.description || ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateUser(user.id, formData);
            updateUserDetails({...user, ...formData});
            navigate('/profile');
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className='form-container'>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Bio:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <button type="submit" className='button'>Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;