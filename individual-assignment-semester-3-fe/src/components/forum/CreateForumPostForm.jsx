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
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center my-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="w-full max-w-xl px-3 py-2 border rounded"
          required
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Content"
          className="w-full max-w-xl px-3 py-2 border rounded"
          rows="4"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Post</button>
      </form>
    );
  };
  
  export default CreateForumPostForm;