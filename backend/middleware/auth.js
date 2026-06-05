const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

// Middleware pour vérifier l'authentification
const auth = async (req, res, next) => {
  try {
    // 1. Récupérer le token depuis le header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Accès refusé. Aucun token fourni.'
      });
    }

    // 2. Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt_secure');
    
    // 3. Trouver le client associé au token
    const client = await Client.findById(decoded.id);
    
    if (!client) {
      return res.status(401).json({
        success: false,
        message: 'Client non trouvé.'
      });
    }

    // 4. Ajouter le client et le token à la requête
    req.client = client;
    req.token = token;
    
    next();
  } catch (err) {
    console.error('Erreur d\'authentification:', err.message);
    res.status(401).json({
      success: false,
      message: 'Token invalide ou expiré.'
    });
  }
};

// Middleware pour vérifier le rôle admin
const admin = (req, res, next) => {
  if (req.client && req.client.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Accès refusé. Réservé aux administrateurs.'
    });
  }
};

// Middleware pour vérifier que le client a accès au service
const clientOuAdmin = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    
    // Si c'est un admin, on autorise
    if (req.client.role === 'admin') {
      return next();
    }

    // Sinon, vérifier que le service appartient au client
    const service = await require('../models/Service').findById(serviceId);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé.'
      });
    }

    if (service.client.toString() !== req.client._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Ce service ne vous appartient pas.'
      });
    }

    next();
  } catch (err) {
    console.error('Erreur de vérification:', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la vérification.'
    });
  }
};

module.exports = { auth, admin, clientOuAdmin };
