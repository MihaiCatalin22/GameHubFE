import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewService from '../services/ReviewService';
import { useAuth } from '../../contexts/authContext';
import Modal from '../Modal';

const ReviewSubmissionPage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !reviewText.trim()) {
            setModalMessage("Please fill in both rating and review text.");
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
            return;
        }
        if (!user) {
            setModalMessage("You must be logged in to submit a review.");
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
            return;
        }
        const reviewData = { rating, content: reviewText };
        console.log("Review data being sent:", reviewData);
    
        try {
            const response = await reviewService.addReview(gameId, reviewData, user.id);
            console.log("Review submitted successfully:", response.data);
            setModalMessage('Review submitted successfully!');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate(`/games/${gameId}`);
                setRating(0);
                setReviewText('');
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
            <form className="review-form" onSubmit={handleReviewSubmit}>
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
                <textarea
                    className="review-text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Your review"
                    required
                />
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