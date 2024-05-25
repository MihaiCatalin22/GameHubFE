import axios from "axios";

const API_URL = 'http://localhost:8080/users';

  const api = axios.create({
    baseURL: API_URL
  });

  api.interceptors.request.use(
    config => {
      const user = sessionStorage.getItem('user');
      if (user) {
          const { jwt } = JSON.parse(user);
          config.headers['Authorization'] = `Bearer ${jwt}`;
          console.log("Axios request config:", config);
      }
      return config;
  },
  error => Promise.reject(error)
  );

  const getAllUsers = async () => {
    return await api.get(`http://localhost:8080/users`);
  };

  const getUserById = (userId) => {
    return api.get(`/${userId}`);
  };

  const createUser = (userData) => {
    return api.post(`http://localhost:8080/users`, userData);
  };

  const updateUser = (userId, userData) => {
    return api.put(`/${userId}`, userData);
  };

  const deleteUser = (userId) => {
    return api.delete(`/${userId}`);
  };

  const login = async (userData) => {
    try {
      const response = await api.post('/login', userData);
      const data = response.data;
      if (data.jwt) {
        sessionStorage.setItem('user', JSON.stringify(data));
        api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
        return data;
      } else {
        throw new Error('JWT not received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  const sendFriendRequest = (userId, friendId) => {
    return api.post('/friend-requests/send', null, { params: { userId, friendId } });
  };
  
  const respondToFriendRequest = (relationshipId, userId, status) => {
    return api.post('/friend-requests/respond', null, { params: { relationshipId, userId, status } });
  };
  
  const getPendingRequests = (userId) => {
    return api.get(`/friend-requests/pending/${userId}`);
  };
  
  const getFriends = (userId) => {
    return api.get(`/friends/${userId}`);
  };
  
  const removeFriend = (userId, friendId) => {
    return api.delete('/friends/remove', { params: { userId, friendId } });
  };
  
  const userService = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    login,
    sendFriendRequest,
    respondToFriendRequest,
    getPendingRequests,
    getFriends,
    removeFriend,
  };

export default userService;