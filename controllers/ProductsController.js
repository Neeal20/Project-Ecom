const express = require('express');
const routerProducts = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
// Import du modèle de produits
const { Products } = require ('../models/Products');

routerProducts.use('request', (req, res) => {
  // On spécifie l'entête pour le CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  // On gère le cas où le navigateur fait un pré-contrôle avec OPTIONS ...
  // ... pas besoin d'aller plus loin dans le traitement, on renvoie la réponse
  if (res.method === 'OPTIONS') {
    // On liste des méthodes et les entêtes valides
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    return res.end();
  }
});

// Méthode GET pour récupérer tous les éléments de notre database
routerProducts.get("/products", (req,res,next) => {
  // Trouve moi dans la collection Products ce qu'elle contient
  Products.find((err, docs) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(!err) {
      res.send(docs);
    } else console.log('Error to get get Data : ' + err);
  });
});

// Récuperer les datas du produit grâce à son id
// eslint-disable-next-line no-unused-vars
routerProducts.get('/products/:id', (req,res,next) => {
  Products.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send(new Error("Product not found!"));
      }
      product.imageUrl =
          req.protocol + "://" + req.get("host") + "/images/" + product.imageUrl;
      res.status(200).json(product);
    })
    .catch(() => {
      res.status(500).send(new Error("Database error!"));
    });
});

// Méthode POST pour permettre de d'ajouter un produit à notre database
routerProducts.post('/products', (req, res, next) => {
  console.log(req.body);
  // Création d'une constante permettant de créer un nouveau produit
  const newProduct = new Products ({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  newProduct.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Impossible de créer le nouveau produit : ' + err);
  });
});

// Méthode PUT pour modifier un produit de mon API
routerProducts.put("/products/:id", (req,res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Id inconnu : " + req.params.id);
  } else {
    console.log("Produit modifié");
  }
  const updateProduct = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };

  Products.findByIdAndUpdate(
    req.params.id,
    {$set: updateProduct},
    {new: true},
    (err, docs) => {
      if(!err) {
        res.send(docs);
      } else {
        console.log("Update error : " + err);
      }
    }
  );
});


// Méthode PUT pour modifier un produit de mon API
routerProducts.delete("/products/:id", (req,res,next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Id inconnu : " + req.params.id);
  }
  Products.findByIdAndRemove(
    req.params.id,
    (err,docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error " + err);
    }
  );
});



module.exports = routerProducts;
