import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const BookRating = ({ bookId, studentId, initialRating = 0, onRatingSubmit }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/reviews/${bookId}`, {
        student_id: studentId,
        rating,
        comment
      });
      setSuccess('Avis enregistré avec succès !');
      setError('');
      if (onRatingSubmit) {
        onRatingSubmit(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
      setSuccess('');
    }
  };

  return (
    <div className="book-rating">
      <h3>Donnez votre avis</h3>
      <form onSubmit={handleSubmit}>
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={index}
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            );
          })}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Votre commentaire (optionnel)"
          className="comment-input"
        />
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit" className="submit-button">
          Envoyer mon avis
        </button>
      </form>

      <style jsx>{`
        .book-rating {
          padding: 20px;
          border-radius: 8px;
          background-color: #f8f9fa;
        }
        .stars {
          display: flex;
          gap: 5px;
          margin-bottom: 15px;
        }
        .star {
          cursor: pointer;
          transition: color 0.2s;
        }
        .comment-input {
          width: 100%;
          min-height: 100px;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 4px;
          resize: vertical;
        }
        .submit-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .submit-button:hover {
          background-color: #0056b3;
        }
        .error {
          color: #dc3545;
          margin: 10px 0;
        }
        .success {
          color: #28a745;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default BookRating; 