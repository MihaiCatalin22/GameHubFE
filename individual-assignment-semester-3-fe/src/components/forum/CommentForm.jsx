import React, { useState } from 'react';
import forumService from '../services/ForumService';
import { useAuth } from '../../contexts/authContext';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const onSubmit = async (data) => {
    clearErrors();
    if (!user || !user.id) {
      setModalMessage("You must be logged in to submit a comment.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      return;
    }

    try {
      const response = await forumService.addCommentToPost(postId, { content: data.content }, user.id);
      onCommentSubmit(response.data);
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
      <textarea
        className="comment-textarea"
        placeholder="Write a comment..."
        {...register('content', { required: 'Comment cannot be empty' })}
        rows="4"
      ></textarea>
      {errors.content && <p className="text-red-500">{errors.content.message}</p>}
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