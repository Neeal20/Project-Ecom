// Import et utilisation du module express
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const result = dotenv.config();
const productsRoutes = require('./controllers/ProductsController');
// Import middleware cors permettant d'ouvrir les droits à l'API products
const cors = require('cors');
const router = require('./router');
require('dotenv').config;
// Import du de la connection avec MongoDb
require('./models/dbConfig');

// Import du middleware 404
const middleware404 = require("./middleware/middleware404");

// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set("views", ('./views'));

// Middleware
// BodyParser pour Parse les datas en JSON
app.use(cors());
app.use(express.json());
app.use(express.static("./public")); // Fichier accessible sans créer de route grâce au "public"
app.use(express.urlencoded({limit: '50mb', extended: true}));

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
