from app import app
from models import db, Student, Book, StudentBook
from datetime import datetime, timedelta

def create_test_data():
    with app.app_context():
        # Vérifier si nous avons déjà des livres
        if Book.query.count() == 0:
            # Créer quelques livres de test
            books = [
                Book(
                    title="Le Petit Prince",
                    author="Antoine de Saint-Exupéry",
                    published_at=datetime(1943, 4, 6),
                    genre="Roman"
                ),
                Book(
                    title="1984",
                    author="George Orwell",
                    published_at=datetime(1949, 6, 8),
                    genre="Science-fiction"
                ),
                Book(
                    title="L'Étranger",
                    author="Albert Camus",
                    published_at=datetime(1942, 5, 19),
                    genre="Roman"
                ),
                Book(
                    title="Fondation",
                    author="Isaac Asimov",
                    published_at=datetime(1951, 5, 1),
                    genre="Science-fiction"
                ),
                Book(
                    title="Les Misérables",
                    author="Victor Hugo",
                    published_at=datetime(1862, 1, 1),
                    genre="Roman"
                )
            ]
            db.session.add_all(books)
            db.session.commit()
            print("Livres de test créés avec succès")

        # Récupérer l'étudiant
        student = Student.query.filter_by(email='student@esme.fr').first()
        if not student:
            print("L'étudiant n'existe pas")
            return

        # Vérifier si l'étudiant a déjà des emprunts
        if StudentBook.query.filter_by(student_id=student.id).count() == 0:
            # Créer des emprunts pour l'étudiant
            books = Book.query.all()
            for i, book in enumerate(books[:3]):  # L'étudiant emprunte les 3 premiers livres
                borrow_date = datetime.now() - timedelta(days=30 - i*10)  # Emprunts échelonnés
                return_date = None if i == 0 else borrow_date + timedelta(days=15)  # Le premier livre est toujours emprunté
                
                borrow = StudentBook(
                    student_id=student.id,
                    book_id=book.id,
                    borrow_date=borrow_date,
                    return_date=return_date
                )
                db.session.add(borrow)
            
            db.session.commit()
            print("Emprunts de test créés avec succès")
        else:
            print("L'étudiant a déjà des emprunts")

if __name__ == '__main__':
    create_test_data() 