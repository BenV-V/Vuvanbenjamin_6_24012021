const Sauce = require('../models/Sauce');
//Permet la suppression
const fs = require('fs');
// Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      //Copie des éléments de req.body
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //Sauvegarde de la sauce
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};
// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  //Vérification de modification
  const sauceObject = req.file ?
    {
      //Récupération des informations
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  //Met à jour les données
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
// Suppression de la sauce
exports.deleteSauce = (req, res, next) => {
  // Identification de la sauce
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      // Suppression de la sauce
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
// Récupération d'une sauce
exports.getOneSauce = (req, res, next) =>{
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};
// Récupération de toutes les sauces
exports.getAllSauce = (req, res, next) =>{
  Sauce.find()
    .then(sauces => res.status(201).json(sauces))
    .catch(error => res.status(400).json({error}))
};


// Fonction like / dislike sauce
exports.likeSauce = (req, res, next) => {    
  const like = req.body.like;
  if(like === 1) { // Si l'utilisateur like
      Sauce.updateOne({_id: req.params.id}, { 
          $inc: { likes: 1}, // On incrémente de 1 le like
          $push: { usersLiked: req.body.userId},_id: req.params.id// On push l'utilisateur
      })
      .then( () => res.status(200).json({ message: `Vous aimez cette sauce` }))
      .catch( error => res.status(400).json({ error}))

  } else if(like === -1) { // Si l'utilisateur dislike
      Sauce.updateOne({_id: req.params.id}, { 
          $inc: { dislikes: 1}, // On incrémente de 1 le dislike
          $push: { usersDisliked: req.body.userId},_id: req.params.id // On push l'utilisateur 
      })
      .then( () => res.status(200).json({ message: `Vous n'aimez pas cette sauce` }))
      .catch( error => res.status(400).json({ error}))

  } else { // Si il s'agit d'annuler un like ou un dislike
      Sauce.findOne( {_id: req.params.id}) //On récupère l'id de l'utilisateur qui a déjà liker ou disliker
      .then( sauce => {
          if( sauce.usersLiked.indexOf(req.body.userId)!== -1){ // On incrémente le like de -1
              Sauce.updateOne({_id: req.params.id}, { 
                   $inc: { likes: -1},
                   $pull: { usersLiked: req.body.userId}, _id: req.params.id 
              })
              .then( () => res.status(200).json({ message: `Vous n'aimez plus cette sauce ?` }))
              .catch( error => res.status(400).json({ error}))
          }
          else if( sauce.usersDisliked.indexOf(req.body.userId)!== -1) { // On incrémente le dislike de -1
              Sauce.updateOne( {_id: req.params.id}, { 
                $inc: { dislikes: -1 }, 
                $pull: { usersDisliked: req.body.userId}, _id: req.params.id
              })
              .then( () => res.status(200).json({message : `Aimez-vous de nouveau cette sauce ?` }))
              .catch( error => res.status(400).json({ error}))
          }           
      })
      .catch( error => res.status(400).json({ error}))             
  }   
};
