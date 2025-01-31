import axios from 'axios';

const API_URL = 'http://localhost:8080/purchases';

const purchaseGame = (userId, gameId) => {
    return axios.post(`${API_URL}/${userId}/game/${gameId}`);
};

const getPurchases = (userId, fromDate, minAmount, maxAmount) => {
    const params = {};
    if (fromDate) params.fromDate = fromDate;
    if (minAmount !== undefined) params.minAmount = minAmount;
    if (maxAmount !== undefined) params.maxAmount = maxAmount;
  
    return axios.get(`${API_URL}/${userId}`, { params });
};

const checkOwnership = async (userId, gameId) => {
    return await axios.get(`${API_URL}/owns`, { params: { userId, gameId } });
  };

const purchaseService = {
    purchaseGame,
    getPurchases,
    checkOwnership
};

export default purchaseService;