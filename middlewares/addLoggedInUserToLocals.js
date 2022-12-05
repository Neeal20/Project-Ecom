const { User } = require("../models");

async function addLoggedInUserToLocals(req, res, next) {

  const userId = req.session.userId; // On récupère l'ID de l'utilisateur dans la session
  if (!userId) { // si l'utilisateur n'est pas loggé (ie. pas d'userId)
    return next(); // On passe à la suite de notre application
  }

  // On récupère toutes les info de l'utilisateur actualisées
  const user = await User.findByPk(userId, { attributes: ["email" ]}); // A chaque requête HTTP, on fait une requête vers la BDD pour charger l'utilisateur loggé
  req.app.locals.user = user; // On stock aussi l'utilisateur dans les locals pour y avoir accès depuis toutes les vues

  next();
}

module.exports = addLoggedInUserToLocals;
