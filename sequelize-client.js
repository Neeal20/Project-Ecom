require("dotenv/config");

const { Sequelize } = require('sequelize');

// Ceci est une instance de connexion à la BDD Postgres (c'est notre "client")
const sequelize = new Sequelize({database: "commerce",
  username: "commerce",
  password: "AVNS_TLHeYZzl8INOvagdDbu",
  host: "db-postgresql-nyc1-94007-do-user-12978570-0.b.db.ondigitalocean.com",
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

// Note : même pas besoin de faire le `connect()`. Par défaut, il se connecte à la base.


module.exports = sequelize;

