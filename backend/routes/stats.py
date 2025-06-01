from flask import Blueprint, jsonify
from models import db, Book, Review, StudentBook
from sqlalchemy import func, desc
from datetime import datetime, timedelta
from flask_cors import CORS

stats_bp = Blueprint('stats', __name__)
CORS(stats_bp, origins='*')

@stats_bp.route('/stats/popular-books', methods=['GET'])
def get_popular_books():
    # Récupère les 5 livres les plus empruntés
    popular_books = db.session.query(
        Book.id,
        Book.title,
        Book.author,
        func.count(StudentBook.id).label('borrow_count')
    ).join(StudentBook).group_by(Book.id).order_by(desc('borrow_count')).limit(5).all()
    
    return jsonify([{
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'borrow_count': book.borrow_count
    } for book in popular_books])

@stats_bp.route('/stats/borrowings-by-genre', methods=['GET'])
def get_borrowings_by_genre():
    # Récupère les emprunts par genre pour le mois en cours
    current_month = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    next_month = (current_month + timedelta(days=32)).replace(day=1)
    
    borrowings = db.session.query(
        Book.genre,
        func.count(StudentBook.id).label('count')
    ).join(StudentBook).filter(
        StudentBook.borrow_date >= current_month,
        StudentBook.borrow_date < next_month
    ).group_by(Book.genre).all()
    
    return jsonify([{
        'genre': genre,
        'count': count
    } for genre, count in borrowings])

@stats_bp.route('/stats/top-rated-books', methods=['GET'])
def get_top_rated_books():
    # Récupère les 5 livres avec les meilleures notes moyennes
    top_books = db.session.query(
        Book.id,
        Book.title,
        Book.author,
        func.avg(Review.rating).label('average_rating'),
        func.count(Review.id).label('review_count')
    ).join(Review).group_by(Book.id).having(
        func.count(Review.id) >= 1  # Au moins une review
    ).order_by(desc('average_rating')).limit(5).all()
    
    return jsonify([{
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'average_rating': float(book.average_rating),
        'review_count': book.review_count
    } for book in top_books])

@stats_bp.route('/stats/borrowings-over-time', methods=['GET'])
def get_borrowings_over_time():
    # Récupère les emprunts sur les 6 derniers mois
    six_months_ago = datetime.now() - timedelta(days=180)
    
    borrowings = db.session.query(
        func.date_trunc('month', StudentBook.borrow_date).label('month'),
        func.count(StudentBook.id).label('count')
    ).filter(
        StudentBook.borrow_date >= six_months_ago
    ).group_by('month').order_by('month').all()
    
    return jsonify([{
        'month': month.strftime('%Y-%m'),
        'count': count
    } for month, count in borrowings]) 