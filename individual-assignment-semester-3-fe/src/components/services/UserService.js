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
    return api.post('/', userData);
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
const userService = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    login
}

export default userService;