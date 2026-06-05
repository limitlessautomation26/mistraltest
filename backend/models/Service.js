const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  url: {
    type: String,
    required: [true, 'L\'URL est requise'],
    trim: true,
    match: [/^https?:\/\/.+/, 'Veuillez entrer une URL valide (http:// ou https://)']
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '/default-service.png'
  },
  icone: {
    type: String,
    trim: true,
    default: '🔗'
  },
  couleur: {
    type: String,
    trim: true,
    default: '#4F46E5'
  },
  ordre: {
    type: Number,
    default: 0
  },
  estActif: {
    type: Boolean,
    default: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateMiseAJour: {
    type: Date,
    default: Date.now
  }
});

// Mettre à jour la date de mise à jour avant sauvegarde
ServiceSchema.pre('save', function(next) {
  this.dateMiseAJour = Date.now();
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);
