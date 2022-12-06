//Este código es un enrutador de express que maneja las rutas de deportes
const express = require('express');
const router = express.Router();
const sportController = require('../../controllers/sportController')

//Obtener todos los deportes
//Obtener un deporte por su ID
//Crear un deporte
//Actualizar un deporte
//Eliminar un deporte
router
    .get('/', sportController.getAllSports)
    .get('/:sportId', sportController.getSportById)
    .post('/', sportController.createSport)
    .put('/:sportId', sportController.updateSport)
    .delete('/:sportId', sportController.deleteSport);

module.exports = router;