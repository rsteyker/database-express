//Importamos express
const express = require("express");
const db = require('./utils/database');
const Users = require('./models/users.model');
const cors = require('cors');
require('dotenv').config();

const PORT  = process.env.PORT || 8000;


// Creamos una instancia de express llamado app

//Ejecutar el método authenticate
db.authenticate() //ES un método asincrono
    .then(() => console.log('Base de datos conectada...'))
    .catch(err => console.error(err));

db.sync() //Sincroniza el modelo con la bd
  .then(() => console.log("bd sincronizada"))
  .catch(err => console.error(err))

const app = express();

//Sirve para extraer datos en objeto en js
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
});

//Insertar Información en base de datos
app.post('/users', async (req, res) => {
    try {
        //Extraemos el cuerpo de la petición
        const newUsers = req.body;

        //Crea los valores en la tabla de db
        await Users.create(newUsers)

        //Respondemos con un 201 - created
        res.status(201).send();

    } catch (error) {
        res.status(404).json(error);
    }
});

//Obtener a todos los asuarios de la base de datos
//SELECT * FROM users;
app.get('/users', async (req, res) => {
    try {
        const users = await Users.findAll({
            //exclude: ['password]
            attributes: ['firstname', 'lastname', 'email']
        });
        res.json(users)

    } catch (error) {
        res.status(400).json(error)
    }
});

//obtener usuario por su id
app.get('/users/id/:id', async (req, res) => {
    try {
        //Para recuperar el parámetro de ruta
        //req.params
        const { id } = req.params;
        //console.log(req.params);

        const user = await Users.findByPk(id, {
            attributes: {
                exclude: ['password'],
            }
        });
        res.json(user);

    } catch (error) {
        res.status(400).json(error)
    }
});

//Encontar a un usuario por algún otro dato
app.get('/users/email/:email', async (req, res) => {
    try {
       const {email} = req.params;
       const user = await Users.findOne({
        where: {email},
       });
       res.json(user);
        
    } catch (error) {
       res.status(400).json(error) 
    }
});

//Eliminar un usuario
//DELETE * FROM users WHERE id=id
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Users.destroy({
            where: { id }
        });
        res.status(204).send(); //Cuando eliminamos no enviamos respuesta

    } catch (error) {
        res.status(400).json(error);
    }
});

//Actualizar información de un usuario
//UPDATE users SET firstname= '', lastname=''  WHERE id = id;
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname } = req.body;
        await Users.update({firstname, lastname}, {
            where: { id }
        });
        res.status(204).send();

    } catch (error) {
        res.status(400).json(error);
    }
});

//Dejar escuchando a nuestro servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

console.log(process.env);


