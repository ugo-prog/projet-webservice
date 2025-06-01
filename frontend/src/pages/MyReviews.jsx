import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.id) {
      fetchMyReviews();
    }
  }, [user.id]);

  const fetchMyReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/me?student_id=${user.id}`);
      setReviews(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement de vos avis');
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement de vos avis...</div>;
  if (error) return <div className="error">{error}</div>;
  if (reviews.length === 0) return <div className="no-reviews">Vous n'avez pas encore laissé d'avis</div>;

  return (
    <div className="my-reviews-page">
      <h1>Mes Avis</h1>
      
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                    size={20}
                  />
                ))}
              </div>
              <span className="review-date">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            
            {review.comment && (
              <p className="review-comment">{review.comment}</p>
            )}

            <div className="book-info">
              <h3>Livre #{review.book_id}</h3>
              <button 
                className="view-book-btn"
                onClick={() => window.location.href = `/books?book=${review.book_id}`}
              >
                Voir le livre
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .my-reviews-page {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
        }

        .reviews-list {
          display: grid;
          gap: 1.5rem;
        }

        .review-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .stars {
          display: flex;
          gap: 0.25rem;
        }

        .review-date {
          color: #666;
          font-size: 0.9rem;
        }

        .review-comment {
          color: #444;
          margin: 1rem 0;
          line-height: 1.5;
        }

        .book-info {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .book-info h3 {
          color: #666;
          margin: 0;
          font-size: 1rem;
        }

        .view-book-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .view-book-btn:hover {
          background: #0056b3;
        }

        .error {
          color: #dc3545;
          text-align: center;
          padding: 1rem;
          background: #fff5f5;
          border-radius: 4px;
          margin: 1rem 0;
        }

        .no-reviews {
          text-align: center;
          color: #666;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .review-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .book-info {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .view-book-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MyReviews; 