import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForumPage from './components/forum/ForumPage';
import GamesPage from './components/game/GamesPage';
import UserProfile from './components/user/UserProfile';
import GameForm from './components/game/GameForm';

const App = () => {
  return (
    <BrowserRouter>
        <main className="flex-grow">
          <div className="flex justify-center items-center w-full h-full min-h-screen">
          <Header />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/add-game" element={<GameForm />} />
            </Routes>
            <Footer />
          </div>
        </main>
    </BrowserRouter>
  );
};

export default App;