const { Router } = require("express");
const router = Router();
const userAuthController = require('./controllers/userAuthController');
const productsRoutes = require('./controllers/ProductsController');

router.get("/", (req, res, next) => {
  res.render("home");
});

router.get("/home", (req, res, next) => {
  res.render("home");
});

router.get("/shop", (req, res, next) => {
  res.render("shop");
});

router.get("/product", (req, res, next) => {
  res.render("product");

});

router.get("/cart", (req, res, next) => {
  res.render("cart");
});

router.get("/login", (req,res,next) => {
  res.render("login");
});

router.get("/signup", userAuthController.renderSignupPage);
router.post("/signup", userAuthController.handleSignupForm);


module.exports = router;
