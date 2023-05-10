"use strict";

var db = require('../utils/database');

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
}, {
  timestamps: false
});
module.exports = Users;
//# sourceMappingURL=users.model.dev.js.map
