import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaChartBar, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <FaBook className="logo" />
          <span>Bibliothèque ESME</span>
        </Link>
      </div>

      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/books" className="nav-item">
              <FaBook />
              <span>Livres</span>
            </Link>
            <Link to="/my-reviews" className="nav-item">
              <FaUser />
              <span>Mes Avis</span>
            </Link>
            <Link to="/statistics" className="nav-item">
              <FaChartBar />
              <span>Statistiques</span>
            </Link>
            <button onClick={handleLogout} className="nav-item logout">
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-item">
            <FaUser />
            <span>Connexion</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 