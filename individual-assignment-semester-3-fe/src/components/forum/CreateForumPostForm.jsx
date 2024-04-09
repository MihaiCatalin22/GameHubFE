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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center my-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="forum-form-input"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="forum-form-textarea"
        rows="4"
        required
      />
      <button type="submit" className="forum-form-button">
        Create Post
      </button>
    </form>
  );
};

export default CreateForumPostForm;