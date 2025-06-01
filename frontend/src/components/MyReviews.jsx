import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const MyReviews = ({ studentId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/me?student_id=${studentId}`);
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement de vos avis');
        setLoading(false);
      }
    };

    if (studentId) {
      fetchReviews();
    }
  }, [studentId]);

  if (loading) return <div>Chargement de vos avis...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!reviews.length) return <div>Aucun avis trouvé</div>;

  return (
    <div className="my-reviews">
      <h2>Mes avis</h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={`${review.book_id}-${review.created_at}`} className="review-card">
            <div className="book-info">
              <h3>Livre #{review.book_id}</h3>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                    size={20}
                  />
                ))}
                <span className="rating-value">{review.rating}/5</span>
              </div>
            </div>
            {review.comment && (
              <div className="comment">
                <p>{review.comment}</p>
              </div>
            )}
            <div className="review-meta">
              <span>Posté le: {new Date(review.created_at).toLocaleDateString()}</span>
              {review.updated_at && review.updated_at !== review.created_at && (
                <span>Modifié le: {new Date(review.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .my-reviews {
          padding: 20px;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .review-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .book-info {
          margin-bottom: 15px;
        }
        .book-info h3 {
          margin: 0 0 10px 0;
          color: #333;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .rating-value {
          margin-left: 10px;
          color: #666;
        }
        .comment {
          margin: 15px 0;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        }
        .comment p {
          margin: 0;
          color: #444;
        }
        .review-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.9em;
          color: #666;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        .error {
          color: #dc3545;
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default MyReviews; 