import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eventService from "../api/EventService";
import { useAuth } from "../contexts/authContext";
import Modal from "../components/Modal";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [eventEnded, setEventEnded] = useState(false);
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

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
        showModal('Success', 'You have joined the event.');
        setEvent(previousEvent => ({
          ...previousEvent,
          participants: [...previousEvent.participants, user]
        }));
      } catch (error) {
        console.error('Failed to join event:', error);
        showModal('Error', 'Failed to join event. Please try again.');
      }
    } else {
      showModal('Error', 'You must be logged in to join the event.');
    }
  };

  const handleLeaveEvent = async () => {
    if (user && user.id) {
      try {
        await eventService.removeParticipant(eventId, user.id);
        showModal('Success', 'You have left the event.');
        const updatedEvent = await eventService.getEventById(eventId);
        setEvent(updatedEvent.data);
      } catch (error) {
        console.error('Failed to leave event:', error);
        showModal('Error', 'Failed to leave event. Please try again.');
      }
    }
  };

  const isParticipant = () => {
    return event && event.participants.some(participant => participant.id === user.id);
  };

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
      <Modal isOpen={modalOpen} title={modalTitle} onClose={closeModal}>
        <p>{modalMessage}</p>
        <div className="modal-footer">
          <button onClick={closeModal} className="modal-button">OK</button>
        </div>
      </Modal>
    </div>
  );
};

export default EventDetails;