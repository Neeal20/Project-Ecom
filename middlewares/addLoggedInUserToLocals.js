const { User } = require("../models");

async function addLoggedInUserToLocals(req, res, next) {
  // On récupère l'ID de l'utilisateur dans la session
  const userId = req.session.userId;

  // A chaque requête HTTP, on fait une requête vers la BDD pour charger l'utilisateur loggé
  const user = await User.findByPk(userId, { attributes: { exclude: ["password" ] }});

  // On stock l'utilisateur dans les locals pour y accéder dans les vues
  req.app.locals.user = user;

  next();
}

module.exports = addLoggedInUserToLocals;
