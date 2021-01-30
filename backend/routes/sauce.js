const express = require('express');

const router = express.Router();
//Import du controller
const sauceCtrl = require('../controllers/sauce');
//Sécurisation des routes
const auth = require('../middleware/auth');
//Gestion des images
const multer = require ('../middleware/multer-config');
// Routes permettant la création, modification ou suppression de sauce, ou la fonction like/dislike
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;