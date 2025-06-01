from flask import Blueprint, request, jsonify
from models import db, Student
from werkzeug.security import check_password_hash
import jwt
from datetime import datetime, timedelta
from config import Config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email et mot de passe requis'}), 400

    student = Student.query.filter_by(email=email).first()
    
    if not student or not check_password_hash(student.password, password):
        return jsonify({'error': 'Email ou mot de passe incorrect'}), 401

    # Créer le token JWT
    token = jwt.encode({
        'student_id': student.id,
        'email': student.email,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, Config.SECRET_KEY, algorithm='HS256')

    return jsonify({
        'token': token,
        'user': {
            'id': student.id,
            'email': student.email,
            'name': student.name,
            'role': student.role
        }
    }), 200 