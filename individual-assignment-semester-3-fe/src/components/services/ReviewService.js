import axios from "axios";

const API_URL = 'http://localhost:8080/reviews';

const getReviewsByGameId = (gameId) => {
    return axios.get(`${API_URL}/game/${gameId}`);
    
};

const getReviewsByUserId = (userId) => {
    return axios.get(`${API_URL}/users/${userId}`);
};

const getAllReviews = () => {
    return axios.get(`${API_URL}/all`);
};

const addReview = (gameId, reviewData, userId) => {
    return axios.post(`${API_URL}/games/${gameId}?userId=${userId}`, reviewData);
};

const updateReview = (reviewId, reviewData) => {
    return axios.put(`${API_URL}/${reviewId}`, reviewData);
};

const deleteReview = (reviewId) => {
    return axios.delete(`${API_URL}/${reviewId}`);
};

const getReviewById = (reviewId) => {
    return axios.get(`${API_URL}/${reviewId}`);
};

const reviewService = {
    getReviewsByGameId,
    getReviewsByUserId,
    getAllReviews,
    addReview,
    updateReview,
    deleteReview,
    getReviewById
};

export default reviewService;