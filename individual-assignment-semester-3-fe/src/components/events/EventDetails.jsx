import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eventService from "../services/EventService";
import { useAuth } from "../../contexts/authContext";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [eventEnded, setEventEnded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await eventService.getEventById(eventId);
      setEvent(response.data);
      updateCountdown(response.data.endDate);
    };

    fetchEvent();

    const timer = setInterval(() => {
      if (event) {
        updateCountdown(event.endDate);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventId, event]);

  const updateCountdown = (endDate) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    if (distance < 0) {
      setEventEnded(true);
      setTimeLeft(null);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  const handleJoinEvent = async () => {
    if (user) {
      try {
        const payload = { userId: user.id };
        const response = await eventService.addParticipant(eventId, payload);
        alert('You have joined the event');
        setEvent(previousEvent => ({
          ...previousEvent,
          participants: [...previousEvent.participants, user]
        }));
      } catch (error) {
        console.error('Failed to join event:', error);
        alert('Failed to join event. Please try again.');
      }
    } else {
      alert('You must be logged in to join the event');
    }
  };
  const handleLeaveEvent = async () => {
    if (user && user.id) {
      try {
        await eventService.removeParticipant(eventId, user.id);
        alert('You have left the event');
        const updatedEvent = await eventService.getEventById(eventId);
        setEvent(updatedEvent.data);
      } catch (error) {
        console.error('Failed to leave event:', error);
        alert('Failed to leave event. Please try again.');
      }
    }
  }
    const isParticipant = () => {
      return event && event.participants.some(participant => participant.id === user.id);
    };
  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>Start Date: {new Date(event.startDate).toLocaleString()}</p>
      {eventEnded ? (
        <p>The event has ended.</p>
      ) : (
        <>
          <p>Time until event ends: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
          {isParticipant() ? (
            <>
              <p>You are participating in this event.</p>
              <button className="button" onClick={handleLeaveEvent}>Leave Event</button>
            </>
          ) : (
            <button className="button" onClick={handleJoinEvent}>Join Event</button>
          )}
          <p>Participants: {event.participants.length}</p>
        </>
        )}
    </div>
  );
};

export default EventDetails;