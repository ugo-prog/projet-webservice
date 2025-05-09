# 📁 Squelette de projet : Flask + React + PostgreSQL

Ce projet constitue un **squelette de départ** pour construire une application web full-stack à base de :

* **Back-end** : Flask (Python)
* **Front-end** : React (Vite)
* **Base de données** : PostgreSQL

Le tout est prêt à être exécuté localement via **Docker** et **Docker Compose**.

---

## ✅ Objectif de ce squelette

Ce projet est destiné à servir de base pour votre propre développement.

**Ce que vous devez faire :**

1. **Cloner** ce dépôt
2. **Lancer l'application localement** (voir ci-dessous)
3. **Construire votre projet** à partir de cette structure

---

## ⚡ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

### Pour Windows / MacOS / Linux :

* [Docker Desktop](https://www.docker.com/products/docker-desktop) (inclut Docker + Docker Compose)
* Git (pour cloner le projet)
* **Make** (outil pour exécuter des commandes automatisées)

  * Windows : installez via [Chocolatey](https://chocolatey.org/) : `choco install make`
  * MacOS : inclus avec Xcode : `xcode-select --install`
  * Linux : `sudo apt install make` (Debian/Ubuntu) ou `sudo dnf install make` (Fedora)

Vous pouvez vérifier leur installation avec :

```bash
docker --version
docker-compose --version
git --version
make --version
```

---

## 🔄 Installation et exécution locale

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd <nom-du-dossier>
```

### 2. Lancer l'application (backend, frontend et BDD)

```bash
make docker-build
```

ou directement :

```bash
docker-compose up --build
```

### 3. Accéder à l'application

* Frontend : [http://localhost:3000](http://localhost:3000)
* Backend API : [http://localhost:5009](http://localhost:5009)
* Base de données PostgreSQL :

  * Hôte : `localhost`
  * Port : `5432`
  * Utilisateur : `myuser`
  * Mot de passe : `mot_de_passe`
  * Base : `esme_inge`

---

## 🧠 Structure du projet

```
full-app/
├── backend/         # Application Flask + DB migrations
├── frontend/        # Application React (Vite)
├── docker-compose.yml
├── Makefile         # Commandes utiles pour dev
└── README.md
```

---

## 🚀 Commandes utiles (via `make`)

```bash
make docker-build   # Build et démarre tous les services
make docker-up      # Démarre sans rebuild
make docker-down    # Stoppe et supprime les conteneurs
make db-init        # Init migrations (une seule fois)
make db-migrate     # Crée une nouvelle migration
make db-upgrade     # Applique les migrations
make db-reset       # Supprime + recrée la base
```

---

## 🛠️ Conseils pour développement

* Codez dans `backend/` et `frontend/`
* Toute modification est automatiquement prise en compte au redémarrage des conteneurs
* Si erreur base de données : vérifiez les migrations (`make db-upgrade`)

---

## 📊 Problèmes courants

| Problème                           | Solution                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| Frontend affiche 404 sur une route | NGINX est configuré pour rediriger vers `index.html`. Assurez-vous que le build est bon.   |
| Erreur de connexion DB             | Vérifiez si la base est bien démarrée (`docker ps`) et que les migrations sont appliquées. |
| Port déjà utilisé                  | Modifiez les ports dans `docker-compose.yml`.                                              |

---

## 🚫 Ce que vous ne devez pas modifier

* Ne changez pas le `docker-compose.yml` sauf si vous comprenez bien les impacts.
* Ne modifiez pas le `Dockerfile` sans refaire les builds.

---

## 📅 Prochaines étapes

1. Définissez les routes de votre API Flask
2. Construisez votre UI React
3. Ajoutez vos tables et migrations si besoin
4. Gérez l'authentification si nécessaire

Bon développement ! 🚀