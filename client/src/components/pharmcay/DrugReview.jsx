// src/components/DrugReviews.js
import { useState, useEffect } from 'react';

const DrugReviews = ({ drugId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetch(`/api/drugs/${drugId}/reviews`)
            .then(res => res.json())
            .then(setReviews);
    }, [drugId]);

    const submitReview = async () => {
        await fetch(`/api/drugs/${drugId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, comment })
        });
    };

    return (
        <div>
            <h3>Reviews</h3>
            <ul>
                {reviews.map((review, idx) => (
                    <li key={idx}>{review.comment} - {review.rating} stars</li>
                ))}
            </ul>

            <h3>Leave a Review</h3>
            <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={submitReview}>Submit Review</button>
        </div>
    );
};

export default DrugReviews;
