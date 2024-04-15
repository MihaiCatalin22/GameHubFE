import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewService from '../services/ReviewService';
import axios from 'axios';

const ReviewSubmissionPage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !reviewText.trim()) {
            alert("Please fill in both rating and review text.");
            return;
        }
    
        const reviewData = { rating, content: reviewText };
        console.log("Review data being sent:", reviewData);
    
        try {
            const response = await reviewService.addReview(gameId, reviewData, 1);
            console.log("Review submitted successfully:", response.data);
            alert('Review submitted successfully!');
            navigate(`/games/${gameId}`);
            setRating(0);
            setReviewText('');
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data : error.message);
            alert('Failed to submit review: ' + (error.response ? error.response.data : "No response data available"));
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
        </div>
    );
};

export default ReviewSubmissionPage;