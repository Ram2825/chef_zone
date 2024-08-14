import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChefList.css';

const ChefList = () => {
    const [chefs, setChefs] = useState([]);
    const [selectedChef, setSelectedChef] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [error, setError] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8200/chef_zone/autenticate/chefs')
            .then(response => {
                setChefs(response.data.results || []);
            })
            .catch(error => {
                console.error('There was an error fetching the chefs!', error);
                setError('There was an error fetching the chefs.');
            });
    }, []);

    const handleBookClick = (chef) => {
        setSelectedChef(chef);
        setShowBookingModal(true);
    };

    const handleReviewsClick = (chef) => {
        setSelectedChef(chef);
        fetchReviews(chef.user_id);
        setShowReviewsModal(true);
    };

    const fetchReviews = (chefId) => {
        axios.get(`http://localhost:8200/chef_zone/reviews/${chefId}`)
            .then(response => {
                setReviews(response.data.results || []);
            })
            .catch(error => {
                console.error('There was an error fetching the reviews!', error);
            });
    };

    const handleAddReviewClick = () => {
        setShowAddReviewModal(true);
    };

    const handleAddReview = () => {
        if (newReview.trim() === '') return;

        axios.post(`http://localhost:8200/chef_zone/reviews/${selectedChef.user_id}`, { review: newReview })
            .then(response => {
                setReviews([...reviews, response.data.newReview]);
                setNewReview('');
                setShowAddReviewModal(false);
            })
            .catch(error => {
                console.error('There was an error adding the review!', error);
            });
    };

    const handleBookingSubmit = () => {
        if (!bookingDate || !bookingTime) {
            alert('Please fill in both date and time.');
            return;
        }

        // Placeholder for booking submission, e.g., API call
        alert(`Booking confirmed for ${selectedChef.first_name} ${selectedChef.last_name} on ${bookingDate} at ${bookingTime}`);
        setShowBookingModal(false);
        setBookingDate('');
        setBookingTime('');
    };

    const closeModal = () => {
        setShowBookingModal(false);
        setShowReviewsModal(false);
        setShowAddReviewModal(false);
        setSelectedChef(null);
    };

    return (
        <div className="chef-list">
            <h1>Available Chefs</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="card-container">
                {chefs.length > 0 ? (
                    chefs.map(chef => (
                        <div key={chef.user_id} className="chef-card">
                            <h2>{chef.first_name} {chef.last_name}</h2>
                            <p><strong>Email:</strong> {chef.email}</p>
                            <p><strong>Mobile No:</strong> {chef.mobile_no}</p>
                            <p><strong>Bio:</strong> {chef.bio || 'N/A'}</p>
                            <p><strong>Specialty:</strong> {chef.speciality || 'N/A'}</p>
                            <p><strong>Experience Years:</strong> {chef.experience_years || 'N/A'}</p>
                            <button onClick={() => handleBookClick(chef)} className="book-button">Book</button>
                            <button onClick={() => handleReviewsClick(chef)} className="reviews-button">
                                Reviews <span className="plus-icon">+</span>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No chefs available at the moment.</p>
                )}
            </div>

            {/* Booking Modal */}
            {showBookingModal && selectedChef && (
                <div className="modal-overlay">
                    <div className="modal-content booking-modal">
                        <h2>Book {selectedChef.first_name} {selectedChef.last_name}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}>
                            <label>
                                Booking Date:
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Booking Time:
                                <input
                                    type="time"
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    required
                                />
                            </label>
                            <div className="modal-buttons">
                                <button type="submit" className="confirm-button">Confirm</button>
                                <button type="button" onClick={closeModal} className="close-button">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reviews Modal */}
            {showReviewsModal && selectedChef && (
                <div className="modal-overlay">
                    <div className="modal-content reviews-modal">
                        <h2>Reviews for {selectedChef.first_name} {selectedChef.last_name}</h2>
                        <ul className="reviews-list">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <li key={index} className="review-item">{review}</li>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </ul>
                        <button onClick={handleAddReviewClick} className="add-review-button">
                            <span className="plus-icon">+</span> Add Review
                        </button>
                        <button onClick={closeModal} className="close-button">Close</button>
                    </div>
                </div>
            )}

            {/* Add Review Modal */}
            {showAddReviewModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-review-modal">
                        <h2>Add a Review</h2>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Write your review here..."
                        />
                        <div className="modal-buttons">
                            <button onClick={handleAddReview} className="confirm-button">Submit</button>
                            <button onClick={closeModal} className="close-button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChefList;
