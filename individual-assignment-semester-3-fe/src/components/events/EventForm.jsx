import React, { useState } from 'react';
import EventService from '../services/EventService';

const EventForm = ({ onEventCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', { startDate, endDate });
    try {
      const eventData = { name, description, startDate, endDate };
      const response = await EventService.createEvent(eventData);
      onEventCreated(response.data);
      alert('Event created successfully!');      
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event.');
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
        <button type="submit" className="event-form-button">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;

