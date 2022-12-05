require("dotenv/config");

const { Sequelize } = require('sequelize');

// Ceci est une instance de connexion à la BDD Postgres (c'est notre "client")
const sequelize = new Sequelize({database: "commerce",
  username: "commerce",
  password: "AVNS_36ZhL6oK9syEcFUwnAr",
  host: "db-commerce-lon1-29832-do-user-12978570-0.b.db.ondigitalocean.com",
  port: 25060,
  sslmode: "require",
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    createdAt: "created_at", // Dans notre table, le champ 'createdAt' s'appelle `create_at`
    updatedAt: "updated_at" // Comme on va avoir plusieurs models, on peut aussi mettre cette liaison directement dans l'instance sequelize
  }
});sequelize.connectionManager;

// const sequelize = new Sequelize(process.env.PG_URL, {
//   dialect: "postgres",
//   define: {
//     // underscored: true, // C'est la technique qui tue pour que Sequelize arrête de nous casser les pieds avec le `camelCase` partout et considère les champs (created_at, updated_at, les entity_id, etc...) en snake case
//     // Liaison table <-> model pour toutes les tables
//     createdAt: "created_at", // Dans notre table, le champ 'createdAt' s'appelle `create_at`
//     updatedAt: "updated_at" // Comme on va avoir plusieurs models, on peut aussi mettre cette liaison directement dans l'instance sequelize
//   }
// });

// Note : même pas besoin de faire le `connect()`. Par défaut, il se connecte à la base.


module.exports = sequelize;

