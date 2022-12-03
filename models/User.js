const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "user"
});


module.exports = User;
