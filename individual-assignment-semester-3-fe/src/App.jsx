import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Header from './components/layoutComponents/Header';
import Footer from './components/layoutComponents/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForumPage from './pages/ForumPage';
import ForumPostDetails from './pages/ForumPostDetails';
import GamesPage from './components/GamesPage';
import UserList from './pages/UserList';
import UserDetailPage from './pages/UserDetailPage';
import GameForm from './pages/GameForm';
import GameDetailsPage from './pages/GameDetails';
import GamesList from './pages/GamesList';
import ReviewSubmissionPage from './pages/ReviewSubmissionPage';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import EditProfile from './pages/EditProfile';
import UserProfile from './pages/UserProfile';
import LogoutPage from './pages/LogoutPage';
import UpdateEventPage from './pages/UpdateEventPage';
import PastEvents from './pages/PastEventsPage';
import EditGamePage from './pages/EditGamePage';
import UserPosts from './pages/UserPosts';
import UserReviews from './pages/UserReviews';
import AboutPage from './pages/About';
import PurchasesPage from './pages/PurchasesPage';
import LibraryPage from './pages/LibraryPage';
import Recommendations from './pages/Recommendations';
import PendingRequestsPage from './pages/PendingRequestsPage';
import FriendsListPage from './pages/FriendsListPage';
import ChatComponent from './pages/ChatComponent';
import WebSocketInitializer from './components/WebSocketInitializer';
import SalesStatisticsPage from './pages/SalesStatisticsPage';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './components/PrivateRoute';
import ForgotPasswordPage from './pages/ForgotPassword';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WebSocketInitializer />
        <div id="root">
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/forum" element={<PrivateRoute><ForumPage /></PrivateRoute>} />
              <Route path="/forum/:postId" element={<ForumPostDetails />} />
              <Route path="/games" element={<PrivateRoute><GamesPage /></PrivateRoute>} />
              <Route path="/gamelist" element={<PrivateRoute><GamesList /></PrivateRoute>} />
              <Route path="/games/:gameId" element={<PrivateRoute><GameDetailsPage /></PrivateRoute>} />
              <Route path="/user/:userId/purchases" element={<PrivateRoute><PurchasesPage /></PrivateRoute>} />
              <Route path="/user/:userId/library" element={<PrivateRoute><LibraryPage /></PrivateRoute>} />
              <Route path="/games/:gameId/review" element={<PrivateRoute><ReviewSubmissionPage /></PrivateRoute>} />
              <Route path="/games/edit/:gameId" element={<PrivateRoute><EditGamePage /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
              <Route path="/users/:userId" element={<PrivateRoute><UserDetailPage /></PrivateRoute>} />
              <Route path="/user/:userId/posts" element={<PrivateRoute><UserPosts /></PrivateRoute>} />
              <Route path="/user/:userId/reviews" element={<PrivateRoute><UserReviews /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
              <Route path="/add-game" element={<PrivateRoute><GameForm /></PrivateRoute>} />
              <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
              <Route path="/events/:eventId" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
              <Route path="/past-events" element={<PrivateRoute><PastEvents /></PrivateRoute>} />
              <Route path="/events/edit/:eventId" element={<PrivateRoute><UpdateEventPage /></PrivateRoute>} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/recommendations/:userId" element={<PrivateRoute><Recommendations /></PrivateRoute>} />
              <Route path="/" element={<AboutPage />} />
              <Route path="/friends" element={<PrivateRoute><FriendsListPage /></PrivateRoute>} />
              <Route path="/pending-requests" element={<PrivateRoute><PendingRequestsPage /></PrivateRoute>} />
              <Route path="/chat/:friendId" element={<PrivateRoute><ChatComponent /></PrivateRoute>} />
              <Route path="/admin/sales-stats" element={<PrivateRoute><SalesStatisticsPage /></PrivateRoute>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
