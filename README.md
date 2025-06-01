# Système de Gestion de Bibliothèque - ESME

Application web permettant aux utilisateurs de noter et commenter les livres empruntés, avec des fonctionnalités de statistiques et de visualisation des tendances.

## 👥 Membres du groupe
- [Liste des membres à compléter]

## 🚀 Installation

### Prérequis
- Docker et Docker Compose
- Git

### Installation et démarrage
1. Cloner le repository :
```bash
git clone https://github.com/ugo-prog/projet-webservice.git
cd projet-webservice
```

2. Lancer l'application :
```bash
docker-compose up --build
```

3. Arreter l'application :
```bash
docker-compose down
```

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend API : http://localhost:5009

## 👤 Comptes de test

### Administrateur
- Email : admin@esme.fr
- Mot de passe : admin123

### Étudiant
- Email : etudiant@esme.fr
- Mot de passe : student123

## 📚 Routes API principales

### Authentification
- `POST /api/auth/login` : Connexion
- `POST /api/auth/register` : Inscription (admin uniquement)

### Livres
- `GET /api/books` : Liste des livres
- `GET /api/books/<id>` : Détails d'un livre
- `POST /api/books` : Ajouter un livre (admin)
- `PUT /api/books/<id>` : Modifier un livre (admin)
- `DELETE /api/books/<id>` : Supprimer un livre (admin)

### Avis
- `POST /api/reviews/<book_id>` : Créer/modifier un avis
- `GET /api/reviews/book/<book_id>` : Liste des avis d'un livre
- `GET /api/reviews/me` : Avis de l'utilisateur connecté

### Statistiques
- `GET /api/stats/popular-books` : Top des livres les plus empruntés
- `GET /api/stats/borrowings-by-genre` : Emprunts par genre et période
- `GET /api/stats/top-rated` : Livres les mieux notés

## 🛠 Variables d'environnement
Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Base de données
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mot_de_passe
POSTGRES_DB=esme_inge
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Flask
FLASK_APP=app.py
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=votre_cle_secrete_ici
JWT_SECRET_KEY=votre_jwt_secret_key_ici

# Ports
BACKEND_PORT=5009
FRONTEND_PORT=3000
DATABASE_PORT=5432

# URLs
API_URL=http://localhost:5009
FRONTEND_URL=http://localhost:3000
```

## 📊 Fonctionnalités

### Backend
- ✅ Authentification JWT
- ✅ Gestion des livres (CRUD)
- ✅ Système de notation (1-5 étoiles)
- ✅ Commentaires sur les livres
- ✅ Statistiques et agrégations
- ✅ Sécurité (un utilisateur ne peut noter que ses livres)

### Frontend
- ✅ Interface de connexion
- ✅ Liste des livres
- ✅ Système de notation avec étoiles
- ✅ Page "Mes avis"
- ✅ Page statistiques avec graphiques
- ✅ Interface responsive

## 🐛 Problèmes connus et solutions

1. **Problème de connexion à la base de données**
   - Solution : Vérifier que PostgreSQL est bien démarré avec `docker ps`
   - Solution : Attendre que le healthcheck de la base de données soit passé

2. **Erreur d'authentification JWT**
   - Solution : Vérifier que le token n'est pas expiré
   - Solution : Se reconnecter pour obtenir un nouveau token

## 📝 Exemple de cas d'usage

1. **Notation d'un livre**
   - Se connecter avec un compte étudiant
   - Aller sur la page d'un livre emprunté
   - Cliquer sur les étoiles pour noter
   - Ajouter un commentaire optionnel
   - Sauvegarder l'avis

2. **Visualisation des statistiques**
   - Se connecter (compte admin ou étudiant)
   - Aller sur la page "Statistiques"
   - Consulter les graphiques d'emprunts par genre
   - Voir le classement des livres les plus populaires
   - Filtrer par période si nécessaire