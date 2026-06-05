require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connexion à la base de données
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/clients', require('./routes/clients'));

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'API Client Dashboard - Bienvenue',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      services: '/api/services',
      clients: '/api/clients'
    }
  });
});

// Route pour tester la connexion à la base de données
app.get('/api/test-db', async (req, res) => {
  try {
    const Client = require('./models/Client');
    const count = await Client.countDocuments();
    res.json({
      success: true,
      message: `Base de données connectée. ${count} clients enregistrés.`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur de connexion à la base de données.',
      error: err.message
    });
  }
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée.'
  });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.message);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur interne.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`URL de l'API: http://localhost:${PORT}`);
  console.log(`URL du frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

module.exports = app;
