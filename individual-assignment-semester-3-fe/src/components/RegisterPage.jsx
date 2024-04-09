import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from './services/UserService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.createUser(userDetails)
      .then(() => {
        console.log('User registered:', userDetails);
        navigate('/');
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-form-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;