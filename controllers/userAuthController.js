const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const { User } = require("../models/index");

function renderLoginPage(req, res) {
  res.render("login");
}

function renderSignupPage(req, res) {
  res.render("signup");
}

async function handleSignupForm(req, res) {
  // - Récupérer les info de l'utilisateur depuis le body du POST
  const {email, password, confirmation } = req.body;

  // - CONTROLES DES INPUTS - Vérifier que le password + le confirmation_password match bien.
  if (password !== confirmation) {
    res.render("signup", { errorMessage: "Le mot de passe et sa confirmation ne correspondent pas." });
    return;
  }

  // - CONTROLES DES INPUTS - On va même vérifier que l'email est au bon format (email-validator npm)
  if (! emailValidator.validate(email)) {
    res.render("signup", { errorMessage: "L'email renseigné est dans un format invalide." });
    return;
  }

  // - CONTROLES DES INPUTS - Mot de passe plus grand que 8 caractères
  if (! password || password.length < 8) {
    res.render("signup", { errorMessage: "Le mot de passe doit faire plus de 8 caractères" });
    return;
  }

  // - On encrypte le mot de passe avant de le stocker dans la BDD (Pourquoi ! Comme ça, si qqun attaque la BDD, il n'aura pas les MDP en clair !)
  const saltRounds = parseInt(process.env.SALT_ROUNDS); // Le temps que prend l'algorithme pour hasher le MDP. Plus c'est grand, plus c'est safe. Plus c'est grand, plus c'est pénible pour l'utilisateur d'attendre.
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  // - Création de l'utilisateur dans la BDD
  await User.create({
    email,
    password: encryptedPassword
  });

  // Rediriger vers la page de connexion
  res.redirect("/login");
}

module.exports = {
  renderLoginPage,
  renderSignupPage,
  handleSignupForm
};
