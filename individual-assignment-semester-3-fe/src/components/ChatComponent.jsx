import React, { useEffect, useState } from "react";
import WebSocketService from "./services/WebSocketService";
import { useAuth } from "../contexts/authContext";
import { useParams } from "react-router-dom";
import userService from "./services/UserService";
import chatService from "./services/ChatService";

const ChatComponent = () => {
    const { user } = useAuth();
    const { friendId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedFriend, setSelectedFriend] = useState(null);

    useEffect(() => {
        const fetchFriend = async () => {
            try {
                const response = await userService.getUserById(friendId);
                setSelectedFriend(response.data);
            } catch (error) {
                console.error('Failed to fetch friend details:', error);
            }
        };

        if (friendId) {
            fetchFriend();
        }
    }, [friendId]);

    const fetchChatHistory = async () => {
        try {
            const response = await chatService.getChatHistory(user.id, friendId);
            setMessages(response.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        }
    };

    useEffect(() => {
        if (user && friendId) {
            fetchChatHistory();
        }
    }, [user, friendId]);

    useEffect(() => {
        if (!user || !selectedFriend) return;

        const onMessageReceived = (msg) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        };

        WebSocketService.connect(user.id, onMessageReceived);

        return () => {
            WebSocketService.disconnect();
        };
    }, [user, selectedFriend]);

    const handleSendMessage = () => {
        if (!user || !selectedFriend) return;

        const chatMessage = {
            senderId: user.id,
            receiverId: selectedFriend.id,
            content: message,
            timestamp: new Date().toISOString()
        };

        WebSocketService.sendMessage("/app/chat.send", chatMessage);
        setMessage('');
    };

    if (!selectedFriend) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chat-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <b>{msg.senderId === user.id ? 'You' : msg.senderUsername}</b>: {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
            />
            <button onClick={handleSendMessage} className="chat-send-button">Send</button>
        </div>
    );
};

export default ChatComponent;
