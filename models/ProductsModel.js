const mongoose = require("mongoose");

// Création d'un modèle de base de donnée qui se sera stocké dans la const productsModel
const ProductsModel = mongoose.model(
  // Écrire le nom de notre base de donnée
  "E-Commerce",
  {
    name: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    date: {type: Date, default: Date.now} // Date.now permet de d'ajouter automatiquement la date de création d'aujourd'hui
  },
  //   Écrire le nom de notre collection
  "products"
);

// Exportation du module
module.exports = { ProductsModel};
