import axios from 'axios';

const API_URL = 'http://localhost:8080/admin';

const getSalesStatistics = (gameTitle, days) => {
    const params = {};
    if (gameTitle) params.gameTitle = gameTitle;
    if (days !== undefined) params.days = days;

    return axios.get(`${API_URL}/sales-stats`, { params });
};

const adminService = {
    getSalesStatistics
};

export default adminService;