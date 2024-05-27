import React, {useState, useEffect} from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import notificationService from "../components/services/NotificationService";

const NotificationDropdown = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loadedNotifications, setLoadedNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await notificationService.getNotificationHistory(user.id);
                setLoadedNotifications(data.filter(notification => !notification.isRead));
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [user]);

    const handleNotificationClick = async (notification) => {
        try {
            await notificationService.markAsRead(notification.id);
            setLoadedNotifications(loadedNotifications.filter(notif => notif.id !== notification.id));
            if (notification.type === 'message') {
                navigate(`/chat/${notification.senderId}`);
            } else if (notification.type === 'event') {
                navigate(`/events/${notification.eventId}`);
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className="notification-dropdown">
            {loadedNotifications.length > 0 ? (
                loadedNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="notification-item"
                        onClick={() => handleNotificationClick(notification)}
                    >
                        {notification.message}
                    </div>
                ))
            ) : (
                <div className="notification-item">
                    No notifications
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;