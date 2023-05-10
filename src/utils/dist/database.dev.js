"use strict";

//Gestionar la conexion a la base de datos
// Importar sequalize
var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

require('dotenv').config(); //Crear una instancia de sequalize con la configuración de conexion a bd.


var db = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
module.exports = db;
//# sourceMappingURL=database.dev.js.map
