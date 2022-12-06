const ObjectID = require('mongoose').Types.ObjectId;
// Import du modèle de produits
const { Products } = require ('../models/Products');

const productsController = {
  renderProductPage (req,res) {
    try {
      res.render("product");
    } catch (error) {
      console.error(error);
      res.status(404).render("404");
    }
  },

  async fetchAllProducts (req,res) {
    // Trouve moi dans la collection Products
    // Tous les produits
    Products.find((err, docs) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      if(!err) {
        res.send(docs);
      } else console.log('Error to get get Data : ' + err);
    });
  },

  async fetchOneProduct (req,res) {
    // Trouve moi dans la collection Products
    // Le produit via son id
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
  },

  async insertToDb (req,res) {
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
  },

  async updateProduct (req,res) {
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
  },

  async deleteProduct (req,res) {
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
  }
};

module.exports = productsController;
