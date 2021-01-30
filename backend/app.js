//Ajout des packages nécessaires
const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

// Ajout des routes sauce et user
const sauceRoutes = require("./routes/sauce");
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

// Connexion à la base de donnée MongoDb
mongoose.connect('mongodb+srv://test:test10@cluster0.y9ruk.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Header pour contourner les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Permet de mettre les données en Json afin de les exploiter
app.use(bodyParser.json());

//Gestion de l'image
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;