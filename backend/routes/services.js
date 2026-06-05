const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Client = require('../models/Client');
const { auth, admin, clientOuAdmin } = require('../middleware/auth');

// @route   GET /api/services
// @desc    Récupérer tous les services (admin) ou les services du client connecté
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let services;
    
    if (req.client.role === 'admin') {
      // Admin: récupérer tous les services
      services = await Service.find().populate('client', 'nom email').sort({ ordre: 1 });
    } else {
      // Client: récupérer uniquement ses services
      services = await Service.find({ client: req.client._id }).sort({ ordre: 1 });
    }

    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des services:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   GET /api/services/:id
// @desc    Récupérer un service spécifique
// @access  Private
router.get('/:id', auth, clientOuAdmin, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('client', 'nom email');
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé.'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (err) {
    console.error('Erreur lors de la récupération du service:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   POST /api/services
// @desc    Créer un nouveau service
// @access  Private (Admin ou Client pour lui-même)
router.post('/', auth, async (req, res) => {
  const { titre, description, url, imageUrl, icone, couleur, ordre, clientId } = req.body;

  try {
    // Vérifier les permissions
    let clientAssocie;
    
    if (req.client.role === 'admin' && clientId) {
      // Admin peut créer pour n'importe quel client
      clientAssocie = await Client.findById(clientId);
      if (!clientAssocie) {
        return res.status(400).json({
          success: false,
          message: 'Client non trouvé.'
        });
      }
    } else {
      // Client normal ne peut créer que pour lui-même
      clientAssocie = req.client;
    }

    // Créer le service
    const service = new Service({
      titre,
      description,
      url,
      imageUrl: imageUrl || '/default-service.png',
      icone: icone || '🔗',
      couleur: couleur || '#4F46E5',
      ordre: ordre || 0,
      client: clientAssocie._id
    });

    await service.save();

    // Ajouter le service au client
    clientAssocie.services.push(service._id);
    await clientAssocie.save();

    // Populer le client pour la réponse
    await service.populate('client', 'nom email');

    res.status(201).json({
      success: true,
      message: 'Service créé avec succès.',
      data: service
    });
  } catch (err) {
    console.error('Erreur lors de la création du service:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   PUT /api/services/:id
// @desc    Mettre à jour un service
// @access  Private
router.put('/:id', auth, clientOuAdmin, async (req, res) => {
  const { titre, description, url, imageUrl, icone, couleur, ordre, estActif } = req.body;

  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé.'
      });
    }

    // Mettre à jour les champs
    service.titre = titre || service.titre;
    service.description = description || service.description;
    service.url = url || service.url;
    service.imageUrl = imageUrl || service.imageUrl;
    service.icone = icone || service.icone;
    service.couleur = couleur || service.couleur;
    service.ordre = ordre !== undefined ? ordre : service.ordre;
    service.estActif = estActif !== undefined ? estActif : service.estActif;

    await service.save();

    // Populer le client pour la réponse
    await service.populate('client', 'nom email');

    res.json({
      success: true,
      message: 'Service mis à jour avec succès.',
      data: service
    });
  } catch (err) {
    console.error('Erreur lors de la mise à jour du service:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   DELETE /api/services/:id
// @desc    Supprimer un service
// @access  Private
router.delete('/:id', auth, clientOuAdmin, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé.'
      });
    }

    // Supprimer le service du tableau du client
    const client = await Client.findById(service.client);
    if (client) {
      client.services = client.services.filter(
        serviceId => serviceId.toString() !== service._id.toString()
      );
      await client.save();
    }

    // Supprimer le service
    await Service.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Service supprimé avec succès.'
    });
  } catch (err) {
    console.error('Erreur lors de la suppression du service:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

// @route   PATCH /api/services/:id/ordre
// @desc    Mettre à jour l'ordre des services (pour le drag & drop)
// @access  Private
router.patch('/ordre', auth, async (req, res) => {
  const { services } = req.body;

  try {
    // Vérifier que tous les services appartiennent au client
    const serviceIds = services.map(s => s.id);
    
    let query;
    if (req.client.role === 'admin') {
      query = { _id: { $in: serviceIds } };
    } else {
      query = { _id: { $in: serviceIds }, client: req.client._id };
    }

    const servicesExistant = await Service.find(query);
    
    if (servicesExistant.length !== services.length) {
      return res.status(400).json({
        success: false,
        message: 'Un ou plusieurs services ne vous appartiennent pas.'
      });
    }

    // Mettre à jour l'ordre pour chaque service
    for (const serviceData of services) {
      await Service.findByIdAndUpdate(serviceData.id, { ordre: serviceData.ordre });
    }

    res.json({
      success: true,
      message: 'Ordre des services mis à jour avec succès.'
    });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'ordre:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: err.message
    });
  }
});

module.exports = router;
