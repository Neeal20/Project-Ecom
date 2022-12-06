// Import et utilisation du module express
const express = require('express');
const app = express();
// Import dotenv
require("dotenv/config");
const productsRoutes = require('./controllers/ProductsController');
// Import du router
const router = require('./router/router');
// Import du de la connection avec MongoDb
require('./database/dbConfig');
// Middleware session
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const addLoggedInUserToLocals = require("./middlewares/addLoggedInUserToLocals");
// Import du middleware 404
const middleware404 = require("./middlewares/middleware404");
// Import middleware cors permettant d'ouvrir les droits à l'API products
const cors = require('cors');


// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set("views", ('./views'));

// BodyParser pour Parse les datas en JSON
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));

// Configurer les sessions
app.use(sessionMiddleware);

// Locals session
app.use(addLoggedInUserToLocals);

// Ouvrir les données aux ip
app.use(cors());

// Fichier accessible sans créer de route grâce au "public"
app.use(express.static("./public"));

// Utilisation du Router Products
app.use('/', productsRoutes);

// On plug le router
app.use(router);

// Apres le router, si la requête n'est pas interceptée et terminé par un des controllers du router), alors on passe au middleware de la 404
app.use(middleware404);

// Création du variable PORT
const port = process.env.PORT;

// Serveur sur écoute du port 5500
app.listen(port, () => {
  console.log('Server app listening on port ' + port);
});
