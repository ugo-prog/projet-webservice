from app import app
from models import db, Student
from werkzeug.security import generate_password_hash

def create_student():
    with app.app_context():
        # Vérifier si l'étudiant existe déjà
        student = Student.query.filter_by(email='student@esme.fr').first()
        if student:
            print("L'utilisateur étudiant existe déjà")
            return

        # Créer l'étudiant
        student = Student(
            email='student@esme.fr',
            password=generate_password_hash('password123'),
            first_name='Étudiant',
            last_name='ESME',
            role='student'
        )
        db.session.add(student)
        db.session.commit()
        print("Utilisateur étudiant créé avec succès")

if __name__ == '__main__':
    create_student() 