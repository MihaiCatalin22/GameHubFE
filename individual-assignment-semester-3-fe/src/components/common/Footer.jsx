import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span>&copy; {new Date().getFullYear()} GameHub. A gaming community for all gamers. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;