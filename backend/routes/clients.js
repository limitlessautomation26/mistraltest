const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Service = require('../models/Service');
const { auth, admin } = require('../middleware/auth');

// @route   GET /api/clients
// @desc    Récupérer tous les clients (admin uniquement)
// @access  Private/Admin
router.get('/', auth, admin, async (req, res) => {
  try {
    const clients = await Client.find().select('-motDePasse').populate('services');
    
    res.json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des clients:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   GET /api/clients/:id
// @desc    Récupérer un client spécifique (admin uniquement)
// @access  Private/Admin
router.get('/:id', auth, admin, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).select('-motDePasse').populate('services');
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client non trouvé.'
      });
    }

    res.json({
      success: true,
      data: client
    });
  } catch (err) {
    console.error('Erreur lors de la récupération du client:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   POST /api/clients
// @desc    Créer un nouveau client (admin uniquement)
// @access  Private/Admin
router.post('/', auth, admin, async (req, res) => {
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
      motDePasse: motDePasse || 'password123', // Mot de passe par défaut si non fourni
      role: role || 'client'
    });

    await client.save();

    // Ne pas retourner le mot de passe
    client.motDePasse = undefined;

    res.status(201).json({
      success: true,
      message: 'Client créé avec succès.',
      data: client
    });
  } catch (err) {
    console.error('Erreur lors de la création du client:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   PUT /api/clients/:id
// @desc    Mettre à jour un client (admin uniquement)
// @access  Private/Admin
router.put('/:id', auth, admin, async (req, res) => {
  const { nom, email, role } = req.body;

  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client non trouvé.'
      });
    }

    // Mettre à jour les champs
    client.nom = nom || client.nom;
    client.email = email || client.email;
    client.role = role || client.role;

    await client.save();

    // Ne pas retourner le mot de passe
    client.motDePasse = undefined;

    res.json({
      success: true,
      message: 'Client mis à jour avec succès.',
      data: client
    });
  } catch (err) {
    console.error('Erreur lors de la mise à jour du client:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   DELETE /api/clients/:id
// @desc    Supprimer un client (admin uniquement)
// @access  Private/Admin
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client non trouvé.'
      });
    }

    // Supprimer tous les services associés au client
    await Service.deleteMany({ client: client._id });

    // Supprimer le client
    await Client.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Client et ses services supprimés avec succès.'
    });
  } catch (err) {
    console.error('Erreur lors de la suppression du client:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   GET /api/clients/:id/services
// @desc    Récupérer les services d'un client spécifique (admin uniquement)
// @access  Private/Admin
router.get('/:id/services', auth, admin, async (req, res) => {
  try {
    const services = await Service.find({ client: req.params.id }).sort({ ordre: 1 });
    
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des services du client:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   PATCH /api/clients/:id/reset-mot-de-passe
// @desc    Réinitialiser le mot de passe d'un client (admin uniquement)
// @access  Private/Admin
router.patch('/:id/reset-mot-de-passe', auth, admin, async (req, res) => {
  const { nouveauMotDePasse } = req.body;

  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client non trouvé.'
      });
    }

    client.motDePasse = nouveauMotDePasse || 'password123';
    await client.save();

    res.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès.'
    });
  } catch (err) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

module.exports = router;
