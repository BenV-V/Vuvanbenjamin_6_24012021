const mongoose = require('mongoose');
//Identifiant unique
const uniqueValidator = require('mongoose-unique-validator');
//Schéma de données de l'utilisateur (mail, password)
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);