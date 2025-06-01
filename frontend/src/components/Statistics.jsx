import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const Statistics = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [borrowingsByGenre, setBorrowingsByGenre] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [borrowingsOverTime, setBorrowingsOverTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, genreRes, ratedRes, timeRes] = await Promise.all([
          axios.get('/api/stats/popular-books'),
          axios.get('/api/stats/borrowings-by-genre'),
          axios.get('/api/stats/top-rated-books'),
          axios.get('/api/stats/borrowings-over-time')
        ]);

        setPopularBooks(popularRes.data);
        setBorrowingsByGenre(genreRes.data);
        setTopRatedBooks(ratedRes.data);
        setBorrowingsOverTime(timeRes.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement des statistiques...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="statistics">
      <h2>Statistiques de la bibliothèque</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Livres les plus empruntés</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularBooks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="borrow_count" fill="#8884d8" name="Nombre d'emprunts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3>Emprunts par genre</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={borrowingsByGenre}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="genre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" name="Nombre d'emprunts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3>Meilleurs livres notés</h3>
          <div className="top-books">
            {topRatedBooks.map((book, index) => (
              <div key={book.id} className="book-item">
                <span className="rank">{index + 1}</span>
                <div className="book-info">
                  <h4>{book.title}</h4>
                  <p>Note moyenne: {book.average_rating.toFixed(1)}/5</p>
                  <p>Nombre d'avis: {book.review_count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3>Évolution des emprunts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={borrowingsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Nombre d'emprunts" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style jsx>{`
        .statistics {
          padding: 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .top-books {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .book-item {
          display: flex;
          align-items: center;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        }
        .rank {
          font-size: 1.5em;
          font-weight: bold;
          margin-right: 15px;
          color: #007bff;
        }
        .book-info {
          flex: 1;
        }
        .book-info h4 {
          margin: 0;
          color: #333;
        }
        .book-info p {
          margin: 5px 0;
          color: #666;
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

export default Statistics; 