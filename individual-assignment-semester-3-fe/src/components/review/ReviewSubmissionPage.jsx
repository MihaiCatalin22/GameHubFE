import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewService from '../services/ReviewService';
import { useAuth } from '../../contexts/authContext';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const ReviewSubmissionPage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [rating, setRating] = useState(0);

    const onSubmit = async (data) => {
        clearErrors();
        if (!user) {
            setModalMessage("You must be logged in to submit a review.");
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
            return;
        }

        const reviewData = { ...data, rating };
        const userId = user.id;

        try {
            const response = await reviewService.addReview(gameId, reviewData, userId);
            console.log("Review submitted successfully:", response.data);
            setModalMessage('Review submitted successfully!');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate(`/games/${gameId}`);
            }, 2000);
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data : error.message);
            setModalMessage('Failed to submit review: ' + (error.response ? error.response.data : "No response data available"));
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
        }
    };

    const handleBack = () => {
        navigate('/games');
    };

    return (
        <div className="review-submission-page">
            <h1>Submit Your Review</h1>
            <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="rating-container">
                    {[...Array(5)].map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`star ${rating > index ? 'filled' : ''}`}
                            onClick={() => setRating(index + 1)}
                        >
                            ☆
                        </button>
                    ))}
                </div>
                <input
                    type="number"
                    id="rating"
                    {...register('rating', { 
                        required: 'Rating is required',
                        min: { value: 1, message: 'Rating must be at least 1' },
                        max: { value: 5, message: 'Rating must be at most 5' }
                    })}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    style={{ display: 'none' }}
                />
                {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                <textarea
                    className="review-text"
                    {...register('content', { required: 'Review text is required' })}
                    placeholder="Your review"
                    rows="4"
                />
                {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                <input type="submit" className='button' value="Submit Review" />
            </form>
            <button onClick={handleBack} className='button'>Go Back</button>
            {showModal && <Modal isOpen={showModal} title="Review Submission Status">
                {modalMessage}
            </Modal>}
        </div>
    );
};

export default ReviewSubmissionPage;