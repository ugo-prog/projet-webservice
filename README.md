# ESME Webservice - Système de Gestion de Bibliothèque

Ce projet est une application web permettant la gestion d'une bibliothèque avec un système de notation et de statistiques.

## Fonctionnalités

- Système d'authentification JWT
- Gestion des livres (CRUD)
- Système de notation et d'avis sur les livres
- Statistiques détaillées (emprunts, notes, genres)
- Interface utilisateur moderne et réactive

## Prérequis

- Docker et Docker Compose
- Node.js (pour le développement frontend)
- Python 3.8+ (pour le développement backend)

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/ugo-prog/projet-webservice.git
cd projet-webservice
```

2. Configurer les variables d'environnement :
```bash
cp backend/.env.example backend/.env
# Éditer backend/.env avec vos configurations
```

3. Lancer l'application avec Docker Compose :
```bash
docker-compose up --build
```

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend : http://localhost:5000

## Développement

### Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou `venv\Scripts\activate` sur Windows
pip install -r requirements.txt
flask run
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

## Routes API Principales

### Livres
- `GET /api/books` : Liste tous les livres
- `GET /api/books/<id>` : Détails d'un livre
- `POST /api/books` : Ajouter un livre
- `PUT /api/books/<id>` : Modifier un livre
- `DELETE /api/books/<id>` : Supprimer un livre

### Avis
- `POST /api/reviews/<book_id>` : Créer/modifier un avis
- `GET /api/reviews/<book_id>` : Liste des avis d'un livre
- `GET /api/reviews/me` : Avis de l'utilisateur connecté

### Statistiques
- `GET /api/stats/popular-books` : Top des livres les plus empruntés
- `GET /api/stats/borrowings-by-genre` : Emprunts par genre
- `GET /api/stats/top-rated-books` : Meilleurs livres notés
- `GET /api/stats/borrowings-over-time` : Évolution des emprunts

## Comptes de Test

- Étudiant :
  - Email : student@esme.fr
  - Mot de passe : password123

- Admin :
  - Email : admin@esme.fr
  - Mot de passe : admin123

## Structure du Projet

```
esme_webservice_full/
├── backend/
│   ├── routes/          # Endpoints API
│   ├── models.py        # Modèles de données
│   ├── app.py          # Application Flask
│   └── requirements.txt # Dépendances Python
├── frontend/
│   ├── src/
│   │   ├── components/ # Composants React
│   │   └── App.jsx    # Application React
│   └── package.json    # Dépendances Node.js
└── docker-compose.yml  # Configuration Docker
```

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.