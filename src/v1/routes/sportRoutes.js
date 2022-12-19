//Este código es un enrutador de express que maneja las rutas de deportes
const express = require('express');
const router = express.Router();
const sportController = require('../../controllers/sportController')
const verifyToken = require('../../middlewares/verificationJWT');

router
    .get('/', sportController.getAllSports)
    .get('/:sportId', sportController.getSportById)
    .post('/',verifyToken, sportController.createSport)
    .put('/:sportId',verifyToken, sportController.updateSport)
    .delete('/:sportId',verifyToken, sportController.deleteSport);

module.exports = router;