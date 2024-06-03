import axios from "axios";

const API_URL = 'http://localhost:8080/chat';

const getChatHistory = async (userId, friendId) => {
    try {
        const response = await axios.get(`${API_URL}/history`, {
            params: { userId, friendId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching chat history:", error);
        throw error;
    }
};

export default { getChatHistory };