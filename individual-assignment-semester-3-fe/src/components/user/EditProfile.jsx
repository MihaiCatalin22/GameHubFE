import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import FileService from '../services/FileService';
import Modal from '../Modal';
import ProfilePictureUpload from './ProfilePictureUpload';
import { useForm } from 'react-hook-form';

const EditProfile = () => {
    const { user, updateUserDetails } = useAuth();
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalConfirmed, setModalConfirmed] = useState(false);

    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm({
        defaultValues: {
            username: user?.username || '',
            email: user?.email || '',
            description: user?.description || '',
            privacy: user?.privacy || 'Public',
            roles: user?.roles || []
        }
    });

    useEffect(() => {
        if (user) {
            console.log('User ID:', user.id);
            reset({
                username: user.username,
                email: user.email || '',
                description: user.description || '',
                privacy: user.privacy || 'Public',
                roles: user.roles || []
            });
        }
    }, [user, reset]);

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
                updateUserDetails({ ...user, profilePicture: URL.createObjectURL(profilePicture) });
                setTimeout(() => setShowModal(false), 2000);
            })
            .catch(error => {
                setModalMessage('Failed to upload profile picture');
                setShowModal(true);
                setTimeout(() => setShowModal(false), 2000);
                console.error('Upload error:', error);
            });
    };

    const onSubmit = async (data) => {
        clearErrors();
        try {
            const updatedData = {
                ...data,
                roles: user.roles,
                id: user.id
            };
            console.log('Updating user ID:', user.id);
            if (!user.id) {
                console.error('User ID is undefined');
                return;
            }
            await updateUserDetails(updatedData);
            setModalMessage('Profile updated successfully!');
            setShowModal(true);
            setModalConfirmed(true);
        } catch (error) {
            console.error("Failed to update profile:", error);
            setModalMessage('Failed to update profile. Please try again.');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
        }
    };

    useEffect(() => {
        if (modalConfirmed) {
            const timer = setTimeout(() => {
                setShowModal(false);
                navigate('/profile');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [modalConfirmed, navigate]);

    return (
        <div className="edit-profile-container">
            <h2 className="edit-profile-title">Edit Your Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='edit-profile-form'>
                <div>
                    <label htmlFor="username" className="edit-profile-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', {
                            required: 'Username is required',
                            minLength: { value: 3, message: 'Username must be at least 3 characters' },
                            maxLength: { value: 20, message: 'Username cannot exceed 20 characters' }
                        })}
                        className="edit-profile-input"
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="edit-profile-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Entered value does not match email format' }
                        })}
                        className="edit-profile-input"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="edit-profile-label">Bio:</label>
                    <textarea
                        id="description"
                        {...register('description', { maxLength: { value: 255, message: 'Description must be less than 255 characters' } })}
                        className="edit-profile-textarea"
                        rows="4"
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <div>
                    <label htmlFor="privacy" className="edit-profile-label">Privacy Settings:</label>
                    <select id="privacy" {...register('privacy')} className="edit-profile-select">
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