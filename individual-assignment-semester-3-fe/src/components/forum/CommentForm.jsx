import React, { useState } from 'react';
import forumService from '../services/ForumService';
import { useAuth } from '../../contexts/authContext';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    if (user && user.id) {
      try {
        const response = await forumService.addCommentToPost(postId, { content: commentContent }, user.id);
        onCommentSubmit(response.data);
        setCommentContent('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        className="comment-textarea"
        placeholder="Write a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="comment-submit-button">
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;