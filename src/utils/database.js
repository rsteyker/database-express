//Gestionar la conexion a la base de datos
// Importar sequalize
const { Sequelize } = require('sequelize');
require('dotenv').config();

//Crear una instancia de sequalize con la configuración de conexion a bd.
const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false }},
});

module.exports = db;