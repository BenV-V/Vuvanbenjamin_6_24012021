const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },  
  name: {type: String, require: true},
  manufacturer: {type: String, require: true},
  description: {type: String, require: true},
  mainPepper: {type: String, require: true},
  imageUrl: {type: String, require: true},
  heat: {type: Number, require: false}, 
  likes: { type: Number, required: false},
  dislikes: { type: Number, required: false},
  usersLiked: {type: [String], required: false},
  usersDisliked: {type: [String], required: false},
});

module.exports = mongoose.model('Sauce', sauceSchema);