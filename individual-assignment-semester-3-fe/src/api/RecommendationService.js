import axios from "axios";

const API_URL = 'http://localhost:8080/recommendations';

const fetchRecommendations = (userId) => {
    return axios.get(`${API_URL}/${userId}`);
};

const recommendationService = {
    fetchRecommendations
};

export default recommendationService;