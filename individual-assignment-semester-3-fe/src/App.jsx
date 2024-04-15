import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layoutComponents/Header';
import Footer from './layoutComponents/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForumPage from './components/forum/ForumPage';
import ForumPostDetails from './components/forum/ForumPostDetails';
import GamesPage from './components/game/GamesPage';
import UsersListPage from './components/user/UserList';
import UserDetailPage from './components/user/UserDetailPage';
import GameForm from './components/game/GameForm';
import GameDetailsPage from './components/game/GameDetails';
import GamesList from './components/game/GamesList';
import ReviewSubmissionPage from './components/review/ReviewSubmissionPage';


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
              <Route path="/forum/:postId" element={<ForumPostDetails />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/gamelist" element={<GamesList />} />
              <Route path="/games/:gameId" element={<GameDetailsPage />} />
              <Route path="/games/:gameId/review" element={<ReviewSubmissionPage />} />
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/users/:userId" element={<UserDetailPage />} />
              <Route path="/add-game" element={<GameForm />} />
            </Routes>
            <Footer />
          </div>
        </main>
    </BrowserRouter>
  );
};

export default App;