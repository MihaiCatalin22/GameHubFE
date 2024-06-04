import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import forumService from "../api/ForumService";
import categoryService from "../api/CategoryService";
import { useAuth } from "../contexts/authContext";
import Modal from './Modal';
import { useForm } from "react-hook-form";

const CreateForumPostForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    categoryService.getCategories()
      .then(response => {
        setCategories(response.data);
        setValue('category', response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setModalMessage('Failed to fetch categories.');
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      });
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!user || !user.id) {
      setModalMessage("You must be logged in to create a post.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      return;
    }

    try {
      const newPost = {
        title: data.title,
        content: data.content,
        category: data.category
      };
      await forumService.createPost(newPost, user.id);
      setModalMessage('Post created successfully!');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/forum'); 
      }, 2000);
    } catch (error) {
      setModalMessage('Failed to create the post. Please try again.');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="game-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="game-form">
        <div>
          <label htmlFor="title" className="game-form-label">Post Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Post title is required' })}
            placeholder="Enter post title"
            className="game-form-input"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="category" className="game-form-label">Category</label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="game-form-input"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>
        <div>
          <label htmlFor="content" className="game-form-label">Content</label>
          <textarea
            id="content"
            {...register('content', { required: 'Content is required' })}
            placeholder="Write your post content here"
            className="game-form-textarea"
            rows="4"
          />
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </div>
        <button type="submit" className="game-form-button">
          Create Post
        </button>
        {showModal && <Modal isOpen={showModal} title="Forum Post Submission">
          {modalMessage}
        </Modal>}
      </form>
    </div>
  );
};

export default CreateForumPostForm;