import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header'
import Footer from './components/common/Footer';
import Navigation from './components/common/Navigation';
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage'; 
import ForumPage from './components/forum/ForumPage'; 
import GamesPage from './components/game/GamesPage';
import UserProfile from './components/user/UserProfile'; 


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;