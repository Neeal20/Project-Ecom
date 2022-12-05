const expressSession = require("express-session");

const sessionMiddleware = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true, // Sauvegarde la session même si il n'y a pas eu de changement dans cette session avec la requête.
  saveUninitialized: true, // Ca sauvegarde la session même si elle est vide
  cookie: { secure: false } // Car on est en HTTP au lieu de HTTPS pour le moment
});

module.exports = sessionMiddleware;
