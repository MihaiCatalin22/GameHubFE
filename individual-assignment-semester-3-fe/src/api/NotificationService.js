import axios from 'axios';

const API_URL = 'http://localhost:8080/notifications';

const getNotificationHistory = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/history`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching notification history:", error);
        throw error;
    }
};

const markAsRead = async (notificationId) => {
    try {
        await axios.post(`${API_URL}/read/${notificationId}`);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
};;

export default { getNotificationHistory, markAsRead };
