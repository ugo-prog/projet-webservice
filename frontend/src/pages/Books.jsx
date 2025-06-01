import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaSearch, FaPlus } from 'react-icons/fa';
import BookRating from '../components/BookRating';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    published_at: '',
    genre: ''
  });
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des livres');
      setLoading(false);
    }
  };

  const handleBookClick = async (bookId) => {
    try {
      const [bookResponse, reviewsResponse] = await Promise.all([
        axios.get(`/api/books/${bookId}`),
        axios.get(`/api/reviews/${bookId}`)
      ]);

      setSelectedBook({
        ...bookResponse.data,
        reviews: reviewsResponse.data.reviews,
        average_rating: reviewsResponse.data.average_rating
      });
    } catch (err) {
      setError('Erreur lors du chargement des détails du livre');
    }
  };

  const handleRatingSubmit = async () => {
    if (selectedBook) {
      await handleBookClick(selectedBook.id);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books', newBook);
      setNewBook({ title: '', author: '', published_at: '', genre: '' });
      setShowAddForm(false);
      fetchBooks();
    } catch (err) {
      setError('Erreur lors de l\'ajout du livre');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.genre && book.genre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="loading">Chargement des livres...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="books-page">
      <div className="books-header">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un livre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {user.role === 'admin' && (
          <button 
            className="add-book-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <FaPlus /> {showAddForm ? 'Annuler' : 'Ajouter un livre'}
          </button>
        )}
      </div>

      {showAddForm && (
        <form className="add-book-form" onSubmit={handleAddBook}>
          <h3>Ajouter un nouveau livre</h3>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Auteur</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="published_at">Date de publication</label>
            <input
              type="date"
              id="published_at"
              name="published_at"
              value={newBook.published_at}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={newBook.genre}
              onChange={handleInputChange}
              placeholder="Roman, Science-fiction, etc."
            />
          </div>
          <button type="submit" className="submit-button">Ajouter le livre</button>
        </form>
      )}

      <div className="books-container">
        <div className="books-list">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className={`book-card ${selectedBook?.id === book.id ? 'selected' : ''}`}
              onClick={() => handleBookClick(book.id)}
            >
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              {book.genre && <p className="genre">{book.genre}</p>}
              <p className="published">
                Publié le: {new Date(book.published_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {selectedBook && (
          <div className="book-details">
            <h2>{selectedBook.title}</h2>
            <div className="book-info">
              <p><strong>Auteur:</strong> {selectedBook.author}</p>
              {selectedBook.genre && <p><strong>Genre:</strong> {selectedBook.genre}</p>}
              <p><strong>Date de publication:</strong> {new Date(selectedBook.published_at).toLocaleDateString()}</p>
              <div className="rating-summary">
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < Math.round(selectedBook.average_rating) ? "#ffc107" : "#e4e5e9"}
                      size={20}
                    />
                  ))}
                </div>
                <span className="rating-value">
                  {selectedBook.average_rating.toFixed(1)}/5
                </span>
                <span className="review-count">
                  ({selectedBook.reviews.length} avis)
                </span>
              </div>
            </div>

            {user.id && (
              <BookRating
                bookId={selectedBook.id}
                studentId={user.id}
                onRatingSubmit={handleRatingSubmit}
              />
            )}

            <div className="reviews-section">
              <h3>Avis des lecteurs</h3>
              {selectedBook.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                          size={16}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
