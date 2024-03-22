import React, { useState } from "react";

const CreateForumPostForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newPost = {
        id: Date.now(),
        title,
        content,
        authorId: 1, 
        timestamp: new Date().toISOString(),
      };
      onSubmit(newPost);
      setTitle('');
      setContent('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Content"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    );
  };
  
  export default CreateForumPostForm;