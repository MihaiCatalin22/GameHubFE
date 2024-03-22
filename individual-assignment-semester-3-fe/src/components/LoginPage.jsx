import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/forum');
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-2">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;