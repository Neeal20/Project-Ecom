const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const { User } = require("../models/index");

function renderLoginPage(req, res) {
  try {
    res.render("login");
  } catch (error) {
    console.error(error);
    res.status(404).render("404");
  }
}

async function handleLoginForm (req,res) {
  try {
    // Récupère les données du body
    const { email , password } = req.body;
    console.log(email, password);

    // Récupère l'utilisateur dans la db
    const user = await User.findOne({
      where: { email }
    });
    // Si il n'existe pas message d'erreur
    if (!user) {
      return res.status(401).render('login', { errorMessage: "Le mot de passe et/ou l'email sont incorrectes" });
    }
    // On compare le mdp brute avec le mdp hashé
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    // Si ça matche pas, on renvoie un message d'erreur
    if (!isMatchingPassword) {
      return res.status(401).render('login', { errorMessage: "Le mot de passe et/ou l'email sont incorrectes" });
    }
    // On va vouloir sauvegarder le fait que l'utilisateur est connecté via express-session
    req.session.userId = user.id;

    // On redirige vers la home page
    res.redirect("/");

  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

function renderSignupPage(req, res) {
  try {
    res.render("signup");
  } catch (error) {
    console.error(error);
    res.status(404).render("404");
  }
}

async function handleSignupForm(req, res) {
  try {
  // - Récupérer les info de l'utilisateur depuis le body du POST
    const {firstname, lastname, email, password, confirmation } = req.body;

    // - CONTROLES DES INPUTS - Vérifier que le password + le confirmation_password match bien.
    if (password !== confirmation) {
      res.status(400).render("signup", { errorMessage: "Le mot de passe et sa confirmation ne correspondent pas." });
      return;
    }

    // On vérifie qu'il n'existe pas un utilisateur avec le même email
    const exiseUserMailInDB = await User.findOne({
      where: { email }
    });
    if (exiseUserMailInDB) {
      res.status(400).render("signup", { errorMessage : "Ce mail est déjà utilisé" });
    }

    // - CONTROLES DES INPUTS - On va même vérifier que l'email est au bon format (email-validator npm)
    if (! emailValidator.validate(email)) {
      res.status(400).render("signup", { errorMessage: "L'email renseigné est dans un format invalide." });
      return;
    }

    // - CONTROLES DES INPUTS - Mot de passe plus grand que 8 caractères
    if (! password || password.length < 8) {
      res.status(400).render("signup", { errorMessage: "Le mot de passe doit faire plus de 8 caractères" });
      return;
    }

    // - On encrypte le mot de passe avant de le stocker dans la BDD (Pourquoi ! Comme ça, si qqun attaque la BDD, il n'aura pas les MDP en clair !)
    const saltRounds = parseInt(process.env.SALT_ROUNDS); // Le temps que prend l'algorithme pour hasher le MDP. Plus c'est grand, plus c'est safe. Plus c'est grand, plus c'est pénible pour l'utilisateur d'attendre.
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const role = "member";
    // - Création de l'utilisateur dans la BDD
    await User.create({
      email,
      firstname,
      lastname,
      password: encryptedPassword,
      role: role
    });

    // Rediriger vers la page de connexion
    res.redirect("/login");

  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

async function logoutAndRedirect(req, res) {
  req.session.userId = null; // Retirer l'utilisateur de la session

  res.redirect("/");
}

module.exports = {
  renderLoginPage,
  handleLoginForm,
  renderSignupPage,
  handleSignupForm,
  logoutAndRedirect
};
