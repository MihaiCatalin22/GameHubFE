import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import userService from './services/UserService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      
      const response = await userService.login({ username, password });
      if (response.jwt) {
        loginUser({
          ...response,
          username: response.username,
          token: response.jwt
        });
        navigate('/');
      } else {
        setError("Authentication token not received.");
      }
    } catch (error) {
      console.error('Error during login:', error);
      const errMsg = error.response && error.response.data ? error.response.data.message : "Login failed due to an unexpected issue.";
      setError(errMsg);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="auth-form-label">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
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
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="auth-form-input"
          />
        </div>
        <button type="submit" className="auth-form-button">Login</button>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
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