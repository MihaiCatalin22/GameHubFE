import React, { useState, useEffect } from 'react';
import gameService from '../services/GameService';
import GenreTagsInput from './GenreTagsInput';
import { useAuth } from '../../contexts/authContext';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const GameForm = ({ onSave, initialData }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { user } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState(initialData?.genres || []);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title || '');
      setValue('releaseDate', initialData.releaseDate || '');
      setValue('description', initialData.description || '');
      setValue('developer', initialData.developer || '');
      setValue('price', initialData.price || '');
      setSelectedGenres(initialData.genres || []);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data) => {
    if (!user || !user.role.includes('ADMINISTRATOR')) {
      setModalMessage("You do not have permission to modify game details.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      return;
    }
    
    const gameData = { ...data, genres: selectedGenres };
    try {
      const response = initialData?.id ? await gameService.updateGame(initialData.id, gameData) : await gameService.createGame(gameData);
      onSave(response.data);
      setModalMessage('Game details saved successfully!');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    } catch (error) {
      console.error('Error saving game:', error);
      setModalMessage('Failed to save game details. Please try again.');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Game Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 game-form">
        <div>
          <label htmlFor="title" className="auth-form-label">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', {
              required: 'Title is required',
              maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
            })}
            placeholder="Game Title"
            className="auth-form-input"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="genres" className="auth-form-label">Genres</label>
          <GenreTagsInput
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
        </div>
        <div>
          <label htmlFor="releaseDate" className="auth-form-label">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            {...register('releaseDate', { required: 'Release date is required' })}
            className="auth-form-input"
          />
          {errors.releaseDate && <p className="text-red-500">{errors.releaseDate.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="auth-form-label">Description</label>
          <textarea
            id="description"
            {...register('description', { 
              required: 'Description is required',
              maxLength: { value: 1500, message: 'Description cannot exceed 1500 characters' }
            })}
            placeholder="Game Description"
            className="auth-form-input"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="developer" className="auth-form-label">Developer</label>
          <input
            type="text"
            id="developer"
            {...register('developer', { required: 'Developer is required' })}
            placeholder="Developer Name"
            className="auth-form-input"
          />
          {errors.developer && <p className="text-red-500">{errors.developer.message}</p>}
        </div>
        <div>
          <label htmlFor="price" className="auth-form-label">Price (€)</label>
          <input
            type="number"
            id="price"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be a positive number' }
            })}
            placeholder="Game Price"
            step="0.01"
            className="auth-form-input"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>
        <button type="submit" className="auth-form-button">
          Save Game
        </button>
        {showModal && <Modal isOpen={showModal} title="Game Update Status">
          {modalMessage}
        </Modal>}
      </form>
    </div>
  );
};

export default GameForm;