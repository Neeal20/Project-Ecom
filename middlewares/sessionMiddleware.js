const expressSession = require("express-session");
const pgSession = require('connect-pg-simple')(expressSession);
require("dotenv/config");

const { Client } = require("pg");

const client = new Client(process.env.PG_URL);

client.connect();

const sessionMiddleware = expressSession({
  store: new pgSession({
    pool : client,
    tableName : 'user_session',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET, // Rajoute une couche de securité sur la generation de la SESSION_ID
  resave: true, // Sauvegarde la session même si il n'y a pas eu de changement dans cette session avec la requête.
  saveUninitialized: true, // Ca sauvegarde la session même si elle est vide
  cookie: { secure: false } // Car on est en HTTP au lieu de HTTPS pour le moment
});

module.exports = sessionMiddleware;
