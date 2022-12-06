const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-client");

class User extends Model {}

User.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(["member", "admin"]), // On autorise seulement 2 valeurs possible : "member" et "admin"
    allowNull: false
  }
}, {
  sequelize,
  tableName: "user"
});


module.exports = User;
