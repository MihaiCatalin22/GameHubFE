import React, { useState } from 'react';

const GenreTagsInput = ({ selectedGenres, setSelectedGenres }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && input) {
      event.preventDefault();
      const genreToAdd = input.trim();
      if (genreToAdd && !selectedGenres.includes(genreToAdd)) {
        setSelectedGenres([...selectedGenres, genreToAdd]);
        setInput('');
      }
    }
  };

  const handleDelete = (genreToDelete) => {
    setSelectedGenres(selectedGenres.filter((genre) => genre !== genreToDelete));
  };

  return (
    <div>
      <div className="genre-tags-container">
        {selectedGenres.map((genre, index) => (
          <div key={index} className="genre-tag">
            {genre}
            <button type="button" onClick={() => handleDelete(genre)}>x</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type genre and press Enter"
        className="genre-input"
      />
    </div>
  );
};

export default GenreTagsInput;