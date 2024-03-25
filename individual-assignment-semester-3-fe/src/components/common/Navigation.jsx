import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-stretch">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-gray-300" : "") + " hover:text-gray-300"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/games"
            className={({ isActive }) => (isActive ? "text-gray-300" : "") + " hover:text-gray-300"}
          >
            Games
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/forum"
            className={({ isActive }) => (isActive ? "text-gray-300" : "") + " hover:text-gray-300"}
          >
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "text-gray-300" : "") + " hover:text-gray-300"}
          >
            Profile
          </NavLink>
        </li>
      </div>
    </nav>
  );
};

export default Navigation;