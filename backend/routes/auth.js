const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const { auth } = require('../middleware/auth');

// @route   POST /api/auth/inscription
// @desc    Inscrire un nouveau client
// @access  Public
router.post('/inscription', async (req, res) => {
  const { nom, email, motDePasse, role } = req.body;

  try {
    // Vérifier si le client existe déjà
    let client = await Client.findOne({ email });
    if (client) {
      return res.status(400).json({
        success: false,
        message: 'Un client avec cet email existe déjà.'
      });
    }

    // Créer un nouveau client
    client = new Client({
      nom,
      email,
      motDePasse,
      role: role || 'client'
    });

    await client.save();

    // Générer un token JWT
    const payload = {
      id: client._id,
      nom: client.nom,
      email: client.email,
      role: client.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'votre_secret_jwt_secure',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Client créé avec succès.',
      data: {
        token,
        client: {
          id: client._id,
          nom: client.nom,
          email: client.email,
          role: client.role
        }
      }
    });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'inscription.',
      error: err.message
    });
  }
});

// @route   POST /api/auth/connexion
// @desc    Connecter un client
// @access  Public
router.post('/connexion', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    // Vérifier si le client existe
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({
        success: false,
        message: 'Identifiants invalides.'
      });
    }

    // Vérifier le mot de passe
    const estValide = await client.compareMotDePasse(motDePasse);
    if (!estValide) {
      return res.status(400).json({
        success: false,
        message: 'Identifiants invalides.'
      });
    }

    // Générer un token JWT
    const payload = {
      id: client._id,
      nom: client.nom,
      email: client.email,
      role: client.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'votre_secret_jwt_secure',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Connexion réussie.',
      data: {
        token,
        client: {
          id: client._id,
          nom: client.nom,
          email: client.email,
          role: client.role
        }
      }
    });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion.',
      error: err.message
    });
  }
});

// @route   GET /api/auth/moi
// @desc    Récupérer les informations du client connecté
// @access  Private
router.get('/moi', auth, async (req, res) => {
  try {
    // Charger les services du client
    await req.client.populate('services');
    
    res.json({
      success: true,
      data: {
        client: {
          id: req.client._id,
          nom: req.client.nom,
          email: req.client.email,
          role: req.client.role,
          dateCreation: req.client.dateCreation,
          services: req.client.services
        }
      }
    });
  } catch (err) {
    console.error('Erreur lors de la récupération du profil:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   POST /api/auth/deconnexion
// @desc    Déconnecter un client (invalider le token)
// @access  Private
router.post('/deconnexion', auth, async (req, res) => {
  try {
    // Note: Pour une vraie invalidation, il faudrait une blacklist de tokens
    // Ici on retourne juste un succès
    res.json({
      success: true,
      message: 'Déconnexion réussie.'
    });
  } catch (err) {
    console.error('Erreur lors de la déconnexion:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   PATCH /api/auth/modifier-mot-de-passe
// @desc    Modifier le mot de passe
// @access  Private
router.patch('/modifier-mot-de-passe', auth, async (req, res) => {
  const { ancienMotDePasse, nouveauMotDePasse } = req.body;

  try {
    // Vérifier l'ancien mot de passe
    const estValide = await req.client.compareMotDePasse(ancienMotDePasse);
    if (!estValide) {
      return res.status(400).json({
        success: false,
        message: 'L\'ancien mot de passe est incorrect.'
      });
    }

    // Mettre à jour le mot de passe
    req.client.motDePasse = nouveauMotDePasse;
    await req.client.save();

    res.json({
      success: true,
      message: 'Mot de passe modifié avec succès.'
    });
  } catch (err) {
    console.error('Erreur lors de la modification du mot de passe:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

module.exports = router;
