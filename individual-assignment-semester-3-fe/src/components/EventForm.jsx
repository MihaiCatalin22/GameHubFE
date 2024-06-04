import React, { useState, useEffect } from 'react';
import eventService from '../api/EventService';
import Modal from './Modal';
import { useForm } from 'react-hook-form';

const EventForm = ({ onEventSaved, existingEvent }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const isUpdate = existingEvent && existingEvent.id;

  useEffect(() => {
    if (existingEvent) {
      setValue('name', existingEvent.name);
      setValue('description', existingEvent.description);
      setValue('startDate', existingEvent.startDate);
      setValue('endDate', existingEvent.endDate);
    }
  }, [existingEvent, setValue]);

  const onSubmit = async (data) => {
    const eventData = { ...data };
    
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
        if (!isUpdate) {
          setValue('name', '');
          setValue('description', '');
          setValue('startDate', '');
          setValue('endDate', '');
        }
      }, 2000);
    } catch (error) {
      console.error('Failed to save event:', error);
      setModalMessage(`Failed to ${isUpdate ? 'update' : 'create'} event.`);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  const validateFutureDate = (date) => {
    const now = new Date();
    return new Date(date) > now || 'Date must be in the future';
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="event-form">
        <div>
          <label className="event-form-label">Name:</label>
          <input
            type="text"
            {...register('name', { required: 'Event name is required' })}
            className="event-form-input"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="event-form-label">Description:</label>
          <textarea
            {...register('description', { required: 'Event description is required' })}
            className="event-form-textarea"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div>
          <label className="event-form-label">Start Date:</label>
          <input
            type="datetime-local"
            {...register('startDate', {
              required: 'Start date is required',
              validate: isUpdate ? undefined : validateFutureDate
            })}
            className="event-form-input"
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="event-form-label">End Date:</label>
          <input
            type="datetime-local"
            {...register('endDate', {
              required: 'End date is required',
              validate: validateFutureDate
            })}
            className="event-form-input"
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
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
