import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import userService from '../api/UserService';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

  const handleLogin = async (data) => {
    clearErrors();
    try {
      const response = await userService.login(data);
      if (response.jwt) {
        loginUser({
          ...response,
          username: response.username,
          token: response.jwt
        });
        navigate('/');
      } else {
        setError("username", { type: "manual", message: "Authentication token not received." });
      }
    } catch (error) {
      console.error('Error during login:', error);
      const errMsg = error.response && error.response.data ? error.response.data.message : "Wrong username or password. Try again.";
      setError("username", { type: "manual", message: errMsg });
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label htmlFor="username" className="auth-form-label">Username</label>
          <input 
            type="text" 
            id="username" 
            {...register('username', { required: 'Username is required' })} 
            className="auth-form-input"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="auth-form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            {...register('password', { required: 'Password is required' })} 
            className="auth-form-input"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="auth-form-button">Login</button>
        {errors.username && <div className="text-red-500 text-center mt-4">{errors.username.message}</div>}
        <p className="text-center">
          New User? 
          <Link to="/register" className="auth-form-link">
            Create an Account
          </Link>
        </p>
        <p className="text-center">
          <Link to="/forgot-password" className="auth-form-link">
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
}
export default LoginPage;