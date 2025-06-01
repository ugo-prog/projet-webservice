import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import MyReviews from "./pages/MyReviews";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/login" element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/books" replace />
              )
            } />
            <Route path="/books" element={
              isAuthenticated ? (
                <Books />
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/statistics" element={
              isAuthenticated ? (
                <Statistics />
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/my-reviews" element={
              isAuthenticated ? (
                <MyReviews />
              ) : (
                <Navigate to="/login" replace />
              )
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
