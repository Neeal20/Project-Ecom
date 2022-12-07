require("dotenv/config");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOSTDB,
  port: process.env.DBPORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialectOptions: {
    ssl: {
      require: true,
      // Ref.: https://github.com/brianc/node-postgres/issues/2009
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
  define: {
    // underscored: true, // C'est la technique qui tue pour que Sequelize arrête de nous casser les pieds avec le `camelCase` partout et considère les champs (created_at, updated_at, les entity_id, etc...) en snake case
    // Liaison table <-> model pour toutes les tables
    createdAt: "created_at", // Dans notre table, le champ 'createdAt' s'appelle `create_at`
    updatedAt: "updated_at" // Comme on va avoir plusieurs models, on peut aussi mettre cette liaison directement dans l'instance sequelize
  }
});

module.exports = sequelize;

