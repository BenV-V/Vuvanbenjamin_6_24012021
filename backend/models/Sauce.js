const mongoose = require('mongoose');
// Création du schéma des sauces avec type et requis ou non
const sauceSchema = mongoose.Schema({
  userId: { type: String, require: true},  
  name: {type: String, require: true},
  manufacturer: {type: String, require: true},
  description: {type: String, require: true},
  mainPepper: {type: String, require: true},
  imageUrl: {type: String, require: true},
  heat: {type: Number, require: true}, 
  likes: { type: Number, required: false, default : 0},
  dislikes: {type: Number, required: false, default : 0},
  usersLiked: {type: [String], required: false},
  usersDisliked: {type: [String], required: false},
});

module.exports = mongoose.model('Sauce', sauceSchema);