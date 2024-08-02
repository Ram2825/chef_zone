import React from 'react';
import './Reviews.css';

const Reviews = () => {
    const reviews = [
        { id: 1, user: 'Jane Doe', content: 'Great service, highly recommend!', rating: 5 },
        { id: 2, user: 'John Smith', content: 'The chef was very professional.', rating: 4 }
    ];

    return (
        <div className="reviews">
            <h1>Customer Reviews</h1>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <p><strong>{review.user}</strong></p>
                        <p>{review.content}</p>
                        <p>Rating: {review.rating} stars</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;
