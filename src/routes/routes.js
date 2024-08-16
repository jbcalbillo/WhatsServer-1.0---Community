const express = require('express');
const router = express.Router();
const path = require('path');
const botController = require("../controllers/botController");


// Verify token
router.get("/", botController.verifyToken);

// Handle incoming messages
router.post("/", botController.receivedMessage);


router.get('/usuarios', (req, res) => {
  require('./menus/menuUsuarios')();
  res.send("Has seleccionado Opciones Usuario.");
});

router.post('/usuarios/agregar', (req, res) => {
  require('../functions/usuarios/agregarusuario')();
  res.send("Usuario agregado.");
});

router.post('/usuarios/borrar', (req, res) => {
  require('../functions/usuarios/borrarusuario')();
  res.send("Usuario borrado.");
});

router.get('/plantillas', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/plantillas.html'));
});

router.post('/plantillas/agregar', (req, res) => {
  require('../functions/plantillas/agregarplantilla')();
  res.send("Plantilla agregada.");
});

router.post('/plantillas/borrar', (req, res) => {
  require('../functions/plantillas/borrarplantilla')();
  res.send("Plantilla borrada.");
});

router.get('/plantillas/ver', (req, res) => {
  require('../sources/plantillas')();
  res.send("Plantillas listadas.");
});

router.get('/single', (req, res) => {
  require('./menus/menuEIndividual')();
  res.send("Has seleccionado Envió de mensaje Simple.");
});

  router.post('/single/', (req, res) => {
    require('../handlers/single/enviarmensajeind')();
    res.send("Mensaje enviado.");
  });

  router.post('/group/plantilla a usuario', (req, res) => {
    require('../handlers/single/enviarplantillaindividual')();
    res.send("Plantilla enviada.");
  });




module.exports = router;
