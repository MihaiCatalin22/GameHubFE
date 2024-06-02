import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Header from './layoutComponents/Header';
import Footer from './layoutComponents/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForumPage from './components/forum/ForumPage';
import ForumPostDetails from './components/forum/ForumPostDetails';
import GamesPage from './components/game/GamesPage';
import UserList from './components/user/UserList';
import UserDetailPage from './components/user/UserDetailPage';
import GameForm from './components/game/GameForm';
import GameDetailsPage from './components/game/GameDetails';
import GamesList from './components/game/GamesList';
import ReviewSubmissionPage from './components/review/ReviewSubmissionPage';
import EventList from './components/events/EventList';
import EventDetails from './components/events/EventDetails';
import EditProfile from './components/user/EditProfile';
import UserProfile from './components/user/UserProfile';
import LogoutPage from './components/LogoutPage';
import UpdateEventPage from './components/events/UpdateEventPage';
import PastEvents from './components/events/PastEventsPage';
import EditGamePage from './components/game/EditGamePage';
import UserPosts from './components/user/UserPosts';
import UserReviews from './components/user/UserReviews';
import AboutPage from './components/About';
import PurchasesPage from './components/purchases/PurchasesPage';
import LibraryPage from './components/user/LibraryPage';
import Recommendations from './components/game/Recommendations';
import PendingRequestsPage from './components/user/friends/PendingRequestsPage';
import FriendsListPage from './components/user/friends/FriendsListPage';
import ChatComponent from './components/ChatComponent';
import WebSocketInitializer from './components/WebSocketInitializer';
import SalesStatisticsPage from './components/game/SalesStatisticsPage';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './components/PrivateRoute';
import ForgotPasswordPage from './components/user/ForgotPassword';

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
              <Route path="/forum" element={<PrivateRoute element={<ForumPage />} />} />
              <Route path="/forum/:postId" element={<PrivateRoute element={<ForumPostDetails />} />} />
              <Route path="/games" element={<PrivateRoute element={<GamesPage />} />} />
              <Route path="/gamelist" element={<PrivateRoute element={<GamesList />} />} />
              <Route path="/games/:gameId" element={<PrivateRoute element={<GameDetailsPage />} />} />
              <Route path="/user/:userId/purchases" element={<PrivateRoute element={<PurchasesPage />} />} />
              <Route path="/user/:userId/library" element={<PrivateRoute element={<LibraryPage />} />} />
              <Route path="/games/:gameId/review" element={<PrivateRoute element={<ReviewSubmissionPage />} />} />
              <Route path="/games/edit/:gameId" element={<PrivateRoute element={<EditGamePage />} />} />
              <Route path="/users" element={<PrivateRoute element={<UserList />} />} />
              <Route path="/users/:userId" element={<PrivateRoute element={<UserDetailPage />} />} />
              <Route path="/user/:userId/posts" element={<PrivateRoute element={<UserPosts />} />} />
              <Route path="/user/:userId/reviews" element={<PrivateRoute element={<UserReviews />} />} />
              <Route path="/profile" element={<PrivateRoute element={<UserProfile />} />} />
              <Route path="/edit-profile" element={<PrivateRoute element={<EditProfile />} />} />
              <Route path="/add-game" element={<PrivateRoute element={<GameForm />} />} />
              <Route path="/events" element={<PrivateRoute element={<EventList />} />} />
              <Route path="/events/:eventId" element={<PrivateRoute element={<EventDetails />} />} />
              <Route path="/past-events" element={<PrivateRoute element={<PastEvents />} />} />
              <Route path="/events/edit/:eventId" element={<PrivateRoute element={<UpdateEventPage />} />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/recommendations/:userId" element={<PrivateRoute element={<Recommendations />} />} />
              <Route path="/" element={<AboutPage />} />
              <Route path="/friends" element={<PrivateRoute element={<FriendsListPage />} />} />
              <Route path="/pending-requests" element={<PrivateRoute element={<PendingRequestsPage />} />} />
              <Route path="/chat/:friendId" element={<PrivateRoute element={<ChatComponent />} />} />
              <Route path="/admin/sales-stats" element={<PrivateRoute element={<SalesStatisticsPage />} />} />
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
