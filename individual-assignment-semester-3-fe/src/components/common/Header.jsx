import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">GameHub</h1>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;