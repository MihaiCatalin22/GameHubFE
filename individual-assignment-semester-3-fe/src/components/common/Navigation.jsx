import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex space-x-4">
      <Link to="/" className="text-white hover:text-gray-300">Home</Link>
      <Link to="/games" className="text-white hover:text-gray-300">Games</Link>
      <Link to="/forum" className="text-white hover:text-gray-300">Forum</Link>
      <Link to="/users" className="text-white hover:text-gray-300">Users</Link>
    </nav>
  );
};

export default Navigation;