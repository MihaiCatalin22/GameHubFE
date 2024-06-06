import { Client } from '@stomp/stompjs';

class WebSocketService {
    client = null;

    connect(userId, onMessageReceived, onNotificationReceived) {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                this.client.subscribe(`/user/${userId}/queue/messages`, message => {
                    onMessageReceived(JSON.parse(message.body));
                });
                this.client.subscribe(`/user/${userId}/queue/notifications`, notification => {
                    onNotificationReceived(JSON.parse(notification.body));
                });
            },
            onStompError: frame => {
                console.error('Broker error:', frame.headers['message']);
                console.error('Additional details:', frame.body);
            }
        });
        this.client.activate();
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
        }
    }

    sendMessage(destination, message) {
        if (this.client && this.client.connected) {
            this.client.publish({
                destination,
                body: JSON.stringify(message)
            });
        }
    }
}

export default new WebSocketService();
