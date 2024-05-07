import axios from "axios";

const API_URL = 'http://localhost:8080/forum';


const createPost = (postData, userId) => {
    return axios.post(`${API_URL}/posts?userId=${userId}`, postData);
  };
  
const getAllPosts = () => {
    return axios.get(`${API_URL}/posts`);
  };
  
  const getPostById = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}`);
  };
 
  const updatePost = (postId, postData) => {
    return axios.put(`${API_URL}/posts/${postId}`, postData);
  };
  
  const deletePost = (postId) => {
    return axios.delete(`${API_URL}/posts/${postId}`);
  };
  
  const likePost = (postId, userId) => {
    return axios.post(`${API_URL}/posts/${postId}/like?userId=${userId}`);
  };
  
  const addCommentToPost = (postId, commentData, userId) => {
    return axios.post(`${API_URL}/posts/${postId}/comments?userId=${userId}`, commentData);
  };

  const getCommentsByPostId = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}/comments`);
  };
  const deleteComment = (postId, commentId) => {
    return axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`);
  };
  const getPostsByUserId = (userId) => {
    return axios.get(`${API_URL}/posts/user/${userId}`);
  };
  const forumService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    addCommentToPost,
    getCommentsByPostId,
    deleteComment,
    getPostsByUserId
  }

  export default forumService
    
  