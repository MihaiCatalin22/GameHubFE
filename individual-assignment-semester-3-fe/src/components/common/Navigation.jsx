import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-center space-x-4">
        <li><NavLink to="/" activeClassName="text-gray-300" className="hover:text-gray-300">Home</NavLink></li>
        <li><NavLink to="/games" activeClassName="text-gray-300" className="hover:text-gray-300">Games</NavLink></li>
        <li><NavLink to="/forum" activeClassName="text-gray-300" className="hover:text-gray-300">Forum</NavLink></li>
        <li><NavLink to="/profile" activeClassName="text-gray-300" className="hover:text-gray-300">Profile</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation;