import React, {useEffect} from "react";
import { useAuth } from "../contexts/authContext";
import WebSocketService from "../api/WebSocketService";

const WebSocketInitializer = () => {
    const { user, setNotifications } = useAuth();
  
    useEffect(() => {
      if (!user) return;
  
      const onMessageReceived = (msg) => {
        console.log("Message received:", msg);
      };
  
      const onNotificationReceived = (notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      };
  
      WebSocketService.connect(user.id, onMessageReceived, onNotificationReceived);
  
      return () => {
        WebSocketService.disconnect();
      };
    }, [user, setNotifications]);
  
    return null;
  };
  
  export default WebSocketInitializer;