import React, { useState } from 'react';
import forumService from '../services/ForumService';
import { useAuth } from '../../contexts/authContext';
import Modal from '../Modal';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setModalMessage("Comment cannot be empty.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      return;
    }

    if (user && user.id) {
      try {
        const response = await forumService.addCommentToPost(postId, { content: commentContent }, user.id);
        onCommentSubmit(response.data);
        setCommentContent('');
        setModalMessage("Comment added successfully.");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setTimeout(() => window.location.reload(), 100);
        }, 2000);
      } catch (error) {
        console.error('Error adding comment:', error);
        setModalMessage("Failed to add comment. Please try again.");
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
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
      {showModal && <Modal isOpen={showModal} title="Comment Submission">
        {modalMessage}
      </Modal>}
    </form>
  );
};

export default CommentForm;