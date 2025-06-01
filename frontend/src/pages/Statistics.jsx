import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState({
    popular_books: [],
    top_rated_books: [],
    borrowings_by_genre: [],
    borrowings_over_time: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [popularBooks, topRatedBooks, borrowingsByGenre, borrowingsOverTime] = await Promise.all([
        axios.get('/api/stats/popular-books'),
        axios.get('/api/stats/top-rated-books'),
        axios.get('/api/stats/borrowings-by-genre'),
        axios.get('/api/stats/borrowings-over-time')
      ]);

      setStats({
        popular_books: popularBooks.data,
        top_rated_books: topRatedBooks.data,
        borrowings_by_genre: borrowingsByGenre.data,
        borrowings_over_time: borrowingsOverTime.data
      });
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
      setLoading(false);
      console.error('Erreur détaillée:', err);
    }
  };

  if (loading) return <div className="loading">Chargement des statistiques...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="statistics-page">
      <h1>Statistiques de la bibliothèque</h1>
      
      <div className="stats-section">
        <h2>Livres les plus populaires</h2>
        <div className="books-grid">
          {stats.popular_books.map((book, index) => (
            <div key={book.id} className="book-card">
              <div className="rank">#{index + 1}</div>
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <div className="book-stats">
                <span>{book.borrow_count} emprunts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h2>Meilleurs livres</h2>
        <div className="books-grid">
          {stats.top_rated_books.map((book, index) => (
            <div key={book.id} className="book-card">
              <div className="rank">#{index + 1}</div>
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <div className="book-stats">
                <span>Note moyenne: {book.average_rating.toFixed(1)}/5</span>
                <span>{book.review_count} avis</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h2>Emprunts par genre</h2>
        <div className="genre-stats">
          {stats.borrowings_by_genre.map(({ genre, count }) => (
            <div key={genre} className="genre-card">
              <h3>{genre || 'Non spécifié'}</h3>
              <div className="stat-value">{count}</div>
              <p>emprunts ce mois</p>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h2>Évolution des emprunts</h2>
        <div className="timeline-stats">
          {stats.borrowings_over_time.map(({ month, count }) => (
            <div key={month} className="timeline-card">
              <div className="month">{month}</div>
              <div className="stat-value">{count}</div>
              <p>emprunts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics; 