import React, { useState } from 'react';

const GenreTagsInput = ({ selectedGenres, setSelectedGenres }) => {
    const [input, setInput] = useState('');
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && input) {
        if (allGenres.includes(input.toUpperCase()) && !selectedGenres.includes(input)) {
          setSelectedGenres([...selectedGenres, input]);
          setInput('');
        }
      }
      if (event.key === 'Backspace' && !input) {
        setSelectedGenres(selectedGenres.slice(0, selectedGenres.length - 1));
      }
    };
  
    const handleDelete = (genreToDelete) => {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreToDelete));
    };
  
    return (
      <div>
        {selectedGenres.map((genre, index) => (
          <div key={index} onClick={() => handleDelete(genre)}>
            {genre}
            <span>[x]</span>
          </div>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type genre and press Enter..."
        />
      </div>
    );
  };
  
  export default GenreTagsInput;