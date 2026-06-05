# Client Dashboard - Interface de gestion des services

Une application **fullstack** (React + Node.js/Express + MongoDB) qui permet à vos clients d'accéder à tous leurs services via un **dashboard centralisé** avec des cards cliquables.

## 🚀 Fonctionnalités

### 👤 **Côté Client**
- **Connexion sécurisée** avec email/mot de passe (JWT)
- **Tableau de bord** avec affichage des services sous forme de **cards**
- **Recherche et filtrage** des services
- **Mode grille ou liste** pour l'affichage
- **Accès direct** aux services via des liens externes
- **Profil utilisateur** avec modification du mot de passe
- **Statistiques** du nombre de services actifs/inactifs

### 👑 **Côté Administrateur**
- **Gestion complète des clients** (CRUD)
- **Gestion des services** pour chaque client
- **Création de services** avec :
  - Titre
  - Description
  - URL (lien vers le service)
  - Image (URL ou couleur de fond)
  - Icône (emoji)
  - Couleur personnalisée
  - Ordre d'affichage
  - Statut (actif/inactif)
- **Réinitialisation des mots de passe**
- **Statistiques globales** (nombre de clients, services, etc.)
- **Tableau de bord admin** avec vue d'ensemble

## 📁 Structure du projet

```
mistraltest/
├── backend/                  # API Node.js/Express
│   ├── config/
│   │   └── db.js            # Configuration MongoDB
│   ├── middleware/
│   │   └── auth.js          # Middleware d'authentification
│   ├── models/
│   │   ├── Client.js        # Modèle Client
│   │   └── Service.js       # Modèle Service
│   ├── routes/
│   │   ├── auth.js          # Routes d'authentification
│   │   ├── clients.js       # Routes clients (admin)
│   │   └── services.js      # Routes services
│   ├── .env.example         # Exemple de variables d'environnement
│   └── server.js            # Point d'entrée du backend
│
├── frontend/                 # Application React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── AdminRoute.js
│   │   │   ├── EmptyState.js
│   │   │   ├── Layout.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── ServiceCard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── admin/
│   │   │   │   ├── AdminClientsPage.js
│   │   │   │   ├── AdminDashboardPage.js
│   │   │   │   └── AdminServicesPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── NotFoundPage.js
│   │   │   ├── ProfilePage.js
│   │   │   └── RegisterPage.js
│   │   ├── styles/
│   │   ├── utils/
│   │   │   └── api.js       # Configuration API et fonctions utilitaires
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── reportWebVitals.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🛠 Prérequis

- **Node.js** (v16 ou supérieur)
- **npm** ou **yarn**
- **MongoDB** (local ou cloud)

## 🚀 Installation et démarrage

### 1. Cloner le dépôt

```bash
cd /workspace/limitlessautomation26__mistraltest
```

### 2. Configurer le backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans le dossier `backend` :

```env
MONGO_URI=mongodb://localhost:27017/client_dashboard
JWT_SECRET=votre_secret_jwt_secure_et_complexe
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

> **Note** : Pour MongoDB Atlas, utilisez une URL de connexion comme :
> `mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/client_dashboard?retryWrites=true&w=majority`

Démarrer le backend :

```bash
npm run dev
# ou
node server.js
```

Le serveur backend sera accessible sur `http://localhost:5000`

### 3. Configurer le frontend

```bash
cd ../frontend
npm install
```

Démarrer le frontend :

```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🎯 Utilisation

### Pour les clients

1. **Connexion** : Accédez à `/connexion` et connectez-vous avec votre email et mot de passe
2. **Dashboard** : Visualisez tous vos services sous forme de cards
3. **Accès aux services** : Cliquez sur une card pour ouvrir le service dans un nouvel onglet
4. **Profil** : Modifiez votre mot de passe dans la section profil

### Pour l'administrateur

1. **Connexion** : Connectez-vous avec un compte administrateur
2. **Tableau de bord admin** : Vue d'ensemble des statistiques
3. **Gestion des clients** : Ajoutez, modifiez ou supprimez des clients
4. **Gestion des services** : Créez des services pour chaque client avec :
   - Titre (ex: "Agent Vocal")
   - Description (ex: "Notre agent vocal intelligent")
   - URL (ex: "https://agent-vocal.votredomaine.com")
   - Image (URL optionnelle)
   - Icône (emoji)
   - Couleur de fond
   - Ordre d'affichage

## 🔐 Authentification

- **JWT** (JSON Web Token) pour l'authentification
- **Durée du token** : 7 jours
- **Stockage** : LocalStorage (côté client)
- **Protection des routes** : Middleware d'authentification pour les routes protégées

## 📊 Modèles de données

### Client

```javascript
{
  nom: String,           // Nom du client
  email: String,         // Email unique
  motDePasse: String,    // Mot de passe haché
  role: String,          // 'client' ou 'admin'
  dateCreation: Date,    // Date de création
  services: [ObjectId]   // Références aux services
}
```

### Service

```javascript
{
  titre: String,         // Titre du service
  description: String,   // Description
  url: String,           // URL du service
  imageUrl: String,      // URL de l'image (optionnel)
  icone: String,         // Icône (emoji)
  couleur: String,        // Couleur de fond
  ordre: Number,         // Ordre d'affichage
  estActif: Boolean,     // Statut
  client: ObjectId,      // Référence au client
  dateCreation: Date,    // Date de création
  dateMiseAJour: Date    // Date de mise à jour
}
```

## 🎨 Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Mongoose** - ODM pour MongoDB
- **bcryptjs** - Hachage des mots de passe
- **jsonwebtoken** - Génération des tokens JWT
- **cors** - Middleware CORS
- **dotenv** - Gestion des variables d'environnement

### Frontend
- **React** - Bibliothèque JavaScript
- **React Router** - Routage
- **Tailwind CSS** - Framework CSS
- **Axios** - Requêtes HTTP
- **Lucide React** - Icônes
- **React Hot Toast** - Notifications
- **Recharts** - Graphiques (optionnel)

## 🌐 API Endpoints

### Authentification
- `POST /api/auth/inscription` - Inscrire un nouveau client
- `POST /api/auth/connexion` - Connecter un client
- `GET /api/auth/moi` - Récupérer le profil du client connecté
- `POST /api/auth/deconnexion` - Déconnecter un client
- `PATCH /api/auth/modifier-mot-de-passe` - Modifier le mot de passe

### Services
- `GET /api/services` - Récupérer tous les services (admin) ou ceux du client
- `GET /api/services/:id` - Récupérer un service spécifique
- `POST /api/services` - Créer un nouveau service
- `PUT /api/services/:id` - Mettre à jour un service
- `DELETE /api/services/:id` - Supprimer un service
- `PATCH /api/services/ordre` - Mettre à jour l'ordre des services

### Clients (Admin uniquement)
- `GET /api/clients` - Récupérer tous les clients
- `GET /api/clients/:id` - Récupérer un client spécifique
- `POST /api/clients` - Créer un nouveau client
- `PUT /api/clients/:id` - Mettre à jour un client
- `DELETE /api/clients/:id` - Supprimer un client
- `GET /api/clients/:id/services` - Récupérer les services d'un client
- `PATCH /api/clients/:id/reset-mot-de-passe` - Réinitialiser le mot de passe

## 📝 Exemples de requêtes

### Créer un client (Admin)

```bash
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "nom": "Jean Dupont",
    "email": "jean@exemple.com",
    "motDePasse": "password123",
    "role": "client"
  }'
```

### Créer un service pour un client

```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "titre": "Agent Vocal",
    "description": "Notre agent vocal intelligent pour vos appels",
    "url": "https://agent-vocal.exemple.com",
    "imageUrl": "https://exemple.com/agent-vocal.png",
    "icone": "🎤",
    "couleur": "#3b82f6",
    "ordre": 1,
    "estActif": true,
    "clientId": "CLIENT_ID"
  }'
```

### Connexion d'un client

```bash
curl -X POST http://localhost:5000/api/auth/connexion \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@exemple.com",
    "motDePasse": "password123"
  }'
```

## 🎯 Fonctionnalités supplémentaires utiles

### Pour les clients
- **Recherche avancée** : Filtrez les services par nom, description ou URL
- **Filtrage par statut** : Affichez uniquement les services actifs ou inactifs
- **Changement de mot de passe** : Modifiez votre mot de passe depuis votre profil
- **Vue responsive** : Adapté aux mobiles, tablettes et desktop
- **Notifications** : Messages de succès/erreur en temps réel

### Pour l'administrateur
- **Gestion multi-clients** : Gérez plusieurs clients avec leurs services
- **Réinitialisation des mots de passe** : Réinitialisez le mot de passe d'un client
- **Statistiques détaillées** : Nombre de clients, services, etc.
- **Recherche et filtrage avancés** : Trouvez rapidement un client ou un service
- **Export des données** : Possibilité d'exporter les données (à développer)
- **Audit des actions** : Historique des actions (à développer)

## 🔧 Personnalisation

### Changer les couleurs

Modifiez les couleurs dans `frontend/tailwind.config.js` :

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ...
    600: '#2563eb',
  }
}
```

### Changer le logo

Modifiez le logo dans les composants `Layout.js` et les pages de connexion/inscription.

### Ajouter de nouveaux champs aux services

1. Modifiez le modèle `Service.js` dans le backend
2. Mettez à jour le formulaire dans `AdminServicesPage.js`
3. Adaptez l'affichage dans `ServiceCard.js`

## 🐛 Résolution des problèmes

### Problème : Connexion à MongoDB échouée

Vérifiez :
- Que MongoDB est démarré
- Que l'URL de connexion est correcte dans `.env`
- Que le port est accessible

### Problème : CORS bloqué

Vérifiez que `FRONTEND_URL` dans `.env` correspond à l'URL de votre frontend.

### Problème : Token JWT invalide

- Vérifiez que `JWT_SECRET` est le même dans le backend et le frontend (si applicable)
- Assurez-vous que le token n'a pas expiré

## 📜 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🙏 Remerciements

- **React** - Pour la création d'interfaces utilisateur
- **Node.js** - Pour le backend JavaScript
- **MongoDB** - Pour la base de données NoSQL
- **Tailwind CSS** - Pour le styling rapide et moderne
- **Lucide React** - Pour les icônes élégantes

---

**Développé avec ❤️ pour simplifier la gestion de vos services clients**

Pour toute question ou suggestion, n'hésitez pas à me contacter.
