"use strict";

//Importamos express
var express = require("express");

var db = require('./utils/database');

var Users = require('./models/users.model');

require('dotenv').config();

var PORT = process.env.PORT || 8000; // Creamos una instancia de express llamado app
//Ejecutar el método authenticate

db.authenticate() //ES un método asincrono
.then(function () {
  return console.log('Base de datos conectada...');
})["catch"](function (err) {
  return console.error(err);
});
db.sync() //Sincroniza el modelo con la bd
.then(function () {
  return console.log("bd sincronizada");
})["catch"](function (err) {
  return console.error(err);
});
var app = express(); //Sirve para extraer datos en objeto en js

app.use(express.json());
app.get("/", function (req, res) {
  res.send("Servidor funcionando...");
}); //Insertar Información en base de datos

app.post('/users', function _callee(req, res) {
  var newUsers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //Extraemos el cuerpo de la petición
          newUsers = req.body; //Crea los valores en la tabla de db

          _context.next = 4;
          return regeneratorRuntime.awrap(Users.create(newUsers));

        case 4:
          //Respondemos con un 201 - created
          res.status(201).send();
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(404).json(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //Obtener a todos los asuarios de la base de datos
//SELECT * FROM users;

app.get('/users', function _callee2(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Users.findAll({
            //exclude: ['password]
            attributes: ['firstname', 'lastname', 'email']
          }));

        case 3:
          users = _context2.sent;
          res.json(users);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //obtener usuario por su id

app.get('/users/id/:id', function _callee3(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          //Para recuperar el parámetro de ruta
          //req.params
          id = req.params.id; //console.log(req.params);

          _context3.next = 4;
          return regeneratorRuntime.awrap(Users.findByPk(id, {
            attributes: {
              exclude: ['password']
            }
          }));

        case 4:
          user = _context3.sent;
          res.json(user);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //Encontar a un usuario por algún otro dato

app.get('/users/email/:email', function _callee4(req, res) {
  var email, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          email = req.params.email;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              email: email
            }
          }));

        case 4:
          user = _context4.sent;
          res.json(user);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //Eliminar un usuario
//DELETE * FROM users WHERE id=id

app["delete"]("/users/:id", function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Users.destroy({
            where: {
              id: id
            }
          }));

        case 4:
          res.status(204).send(); //Cuando eliminamos no enviamos respuesta

          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //Actualizar información de un usuario
//UPDATE users SET firstname= '', lastname=''  WHERE id = id;

app.put('/users/:id', function _callee6(req, res) {
  var id, _req$body, firstname, lastname;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname;
          _context6.next = 5;
          return regeneratorRuntime.awrap(Users.update({
            firstname: firstname,
            lastname: lastname
          }, {
            where: {
              id: id
            }
          }));

        case 5:
          res.status(204).send();
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json(_context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //Dejar escuchando a nuestro servidor 

app.listen(PORT, function () {
  console.log("Servidor corriendo en el puerto ".concat(PORT));
});
console.log(process.env);
//# sourceMappingURL=app.dev.js.map
