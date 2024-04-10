import React, { useState } from "react";
import forumService from '../services/ForumService';

const CreateForumPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
    };
    const userId = 1;
    
    forumService.createPost(newPost, userId)
    .then(response => {
      setTitle('');
      setContent('');
      alert('Post created successfully!');
      console.log('Post created:', response.data);
    })
    .catch(error => {
      alert('Failed to create the post. Please try again.');
      console.error('Error creating post:', error);
    });
};
  
return (
  <div className="form-container">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="form-input"
          required
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="form-textarea"
          rows="4"
          required
        />
      </div>
      <button type="submit" className="form-button">
        Create Post
      </button>
    </form>
  </div>
);
};

export default CreateForumPostForm;