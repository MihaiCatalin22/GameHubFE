import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from './services/UserService';
import Modal from './Modal';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    clearErrors();
    try {
      await userService.createUser(data);
      console.log('User registered:', data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error creating user:', error);
      const errMsg = error.response && error.response.data ? error.response.data.message : "Registration failed due to an unexpected issue.";
      setError("username", { type: "manual", message: errMsg });
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="auth-form-label">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', { 
              required: 'Username is required', 
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
              maxLength: { value: 20, message: 'Username cannot exceed 20 characters' }
            })}
            className="auth-form-input"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="auth-form-label">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^\S+@\S+$/i, message: 'Entered value does not match email format' }
            })}
            className="auth-form-input"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="auth-form-label">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              pattern: {  
                message: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character' 
              }
            })}
            className="auth-form-input"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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