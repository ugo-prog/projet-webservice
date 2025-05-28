# backend/routes/reviews.py
from flask import Blueprint, request, jsonify
from models import db, Review, Student, Book, StudentBook
from datetime import datetime

reviews_bp = Blueprint("reviews", __name__)

@reviews_bp.route("/api/reviews/<int:book_id>", methods=["POST"])
def create_or_update_review(book_id):
    data = request.get_json()
    student_id = data.get("student_id")
    rating = data.get("rating")
    comment = data.get("comment", "")

    # Vérification des champs requis et de la validité de la note
    if not student_id or not isinstance(rating, int) or rating < 1 or rating > 5:
        return jsonify({"error": "student_id et rating (1-5) sont obligatoires"}), 400

    # Vérifier que l'étudiant a bien emprunté le livre (par exemple via StudentBook)
    borrow = StudentBook.query.filter_by(student_id=student_id, book_id=book_id, return_date=None).first()
    if not borrow:
        return jsonify({"error": "Vous n'avez pas emprunté ce livre"}), 403

    # Chercher si un avis existe déjà (pour le mettre à jour) ou en créer un nouveau
    review = Review.query.filter_by(student_id=student_id, book_id=book_id).first()
    if review:
        review.rating = rating
        review.comment = comment
        review.updated_at = datetime.utcnow()
    else:
        review = Review(student_id=student_id, book_id=book_id, rating=rating, comment=comment, created_at=datetime.utcnow())
        db.session.add(review)

    db.session.commit()
    return jsonify({"message": "Avis enregistré avec succès", "review_id": review.id}), 201


# Ajout de l'endpoint GET (GET /api/reviews/<int:book_id>) pour récupérer les avis (et la moyenne des notes) d'un livre (book_id) :
@reviews_bp.route("/api/reviews/<int:book_id>", methods=["GET"])
def get_reviews(book_id):
    reviews = Review.query.filter_by(book_id=book_id).all()
    if not reviews:
        return jsonify({"message": "Aucun avis trouvé pour ce livre."}), 404
    avg_rating = sum(r.rating for r in reviews) / len(reviews) if reviews else 0
    return jsonify({
        "book_id": book_id,
        "average_rating": avg_rating,
        "reviews": [{"student_id": r.student_id, "rating": r.rating, "comment": r.comment, "created_at": r.created_at.isoformat() if r.created_at else None, "updated_at": r.updated_at.isoformat() if r.updated_at else None} for r in reviews]
    }), 200