import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from './services/UserService';
import Modal from './Modal';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.createUser(userDetails)
      .then(() => {
        console.log('User registered:', userDetails);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/login');
        }, 1500);
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="auth-form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            required
            className="auth-form-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="auth-form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
            className="auth-form-input"
          />
        </div>
        <div>
          <label htmlFor="password" className="auth-form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            required
            className="auth-form-input"
          />
        </div>
        <button type="submit" className="auth-form-button">Register</button>
        <Modal isOpen={showModal} title="Registration Status">
          Registered successfully!
        </Modal>
      </form>
    </div>
  );
};

export default RegisterPage;