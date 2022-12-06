const { Router } = require("express");
const router = Router();
const mainController = require('../controllers/mainController');
const userAuthController = require('../controllers/userAuthController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');

// Afficher la page home
router.get("/",mainController.renderHomePage);
router.get("/home",mainController.renderHomePage);

// AFficher la page du profil utilisateur
router.get("/profile", isLoggedIn, mainController.renderUserProfilePage);

// Afficher la page de produit unique
router.get("/product", productController.renderProductPage);

// Afficher la page panier
router.get("/cart", cartController.renderCartPage);

// Router Login
router.get("/login", userAuthController.renderLoginPage);
router.post("/login", userAuthController.handleLoginForm);

// Sign In routes
router.get("/signup", userAuthController.renderSignupPage);
router.post("/signup", userAuthController.handleSignupForm);

// Logout routes
router.get("/logout", isLoggedIn, userAuthController.logoutAndRedirect);



module.exports = router;
