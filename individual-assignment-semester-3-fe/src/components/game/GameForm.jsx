import React, { useState, useEffect } from 'react';
import gameService from '../services/GameService';
import GenreTagsInput from './GenreTagsInput';


const GameForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    genres: [],
    releaseDate: '',
    description: '',
    developer: '',
  });

  const [selectedGenres, setSelectedGenres] = useState(initialData?.genres || []);

  useEffect(() => {
    setSelectedGenres(initialData?.genres || []);
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        releaseDate: initialData.releaseDate || '',
        description: initialData.description || '',
        developer: initialData.developer || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameData = {
      ...formData,
      genres: selectedGenres,
    };
    const action = initialData?.id
      ? gameService.updateGame(initialData.id, gameData)
      : gameService.createGame(gameData);
    
    action
      .then(response => {
        onSave(response.data);
        setFormData({ title: '', releaseDate: '', description: '', developer: '' });
        setSelectedGenres([]);
      })
      .catch(error => {
        console.error('Error saving game:', error);
      });
  };

  return (
    <div className="game-form">
      <div className="game-form-container">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Game Title"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <label htmlFor='genres' classname="block mb-2">Genres</label>
          <GenreTagsInput
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />          
          <div>
            <label htmlFor="releaseDate" className="block mb-2">Release Date</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Game Description"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="developer" className="block mb-2">Developer</label>
            <input
              type="text"
              id="developer"
              name="developer"
              value={formData.developer}
              onChange={handleChange}
              placeholder="Developer Name"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="button">
            Save Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameForm;