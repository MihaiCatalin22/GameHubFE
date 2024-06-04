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
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Unauthorized: Invalid credentials');
            } else if (error.response.status === 403) {
                console.error('Forbidden: Access denied');
            } else {
                console.error(`Error: ${error.response.status}`);
            }
        } else {
            console.error("Error: No response from server");
        }
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
  
  const removeFriend = (relationshipId) => {
    return api.delete(`/friends/remove/${relationshipId}`);
  };

  const verifyUsername = async (username) => {
    try {
        const response = await api.post('/verify-username', { username });
        return response.data;
    } catch (error) {
        console.error('Error verifying username:', error);
        throw error;
    }
};

  
  const resetPassword = async (username, newPassword) => {
    const response = await api.post('/reset-password', { username, newPassword });
    return response.data;
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
    verifyUsername,
    resetPassword
  };

export default userService;