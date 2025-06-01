from app import app
from models import db, Student
from werkzeug.security import generate_password_hash

def create_admin():
    with app.app_context():
        # Vérifier si l'admin existe déjà
        admin = Student.query.filter_by(email='admin@esme.fr').first()
        if admin:
            print("L'utilisateur admin existe déjà")
            return

        # Créer l'admin
        admin = Student(
            email='admin@esme.fr',
            password=generate_password_hash('admin123'),
            first_name='Admin',
            last_name='ESME',
            role='admin'
        )
        db.session.add(admin)
        db.session.commit()
        print("Utilisateur admin créé avec succès")

if __name__ == '__main__':
    create_admin() 