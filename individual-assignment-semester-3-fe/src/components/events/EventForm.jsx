import React, { useState, useEffect } from 'react';
import EventService from '../services/EventService';
import Modal from '../Modal';

const EventForm = ({ onEventSaved, existingEvent }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const isUpdate = existingEvent && existingEvent.id;

  useEffect(() => {
    if (existingEvent) {
      setName(existingEvent.name);
      setDescription(existingEvent.description);
      setStartDate(existingEvent.startDate);
      setEndDate(existingEvent.endDate);
    }
  }, [existingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { name, description, startDate, endDate };
    
    try {
      let response;
      if (isUpdate) {
        response = await EventService.updateEvent(existingEvent.id, eventData);
        setModalMessage('Event updated successfully!');
      } else {
        response = await EventService.createEvent(eventData);
        setModalMessage('Event created successfully!');
      }
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        onEventSaved(response.data);
        setName('');
        setDescription('');
        setStartDate('');
        setEndDate('');
      }, 2000);
    } catch (error) {
      console.error('Failed to save event:', error);
      setModalMessage(`Failed to ${isUpdate ? 'update' : 'create'} event.`);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit} className="event-form">
        <div>
          <label className="event-form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="event-form-input"
            required
          />
        </div>
        <div>
          <label className="event-form-label">Description:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="event-form-textarea"
            required
          />
        </div>
        <div>
          <label className="event-form-label">Start Date:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="event-form-input"
            required
          />
        </div>
        <div>
          <label className="event-form-label">End Date:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="event-form-input"
            required
          />
        </div>
        <button type="submit" className="event-form-button">{isUpdate ? 'Update Event' : 'Create Event'}</button>
        {showModal && <Modal isOpen={showModal} title="Event Submission Status">
          {modalMessage}
        </Modal>}
      </form>
    </div>
  );
};

export default EventForm;

