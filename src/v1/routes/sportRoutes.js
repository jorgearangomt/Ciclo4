const express = require('express');
const router = express.Router();
const sportController = require('../../controllers/sportController')

router
    .get('/', sportController.getAllSports)
    .get('/:sportId', sportController.getSportById)
    .post('/', sportController.createSport)
    .put('/:sportId', sportController.updateSport)
    .delete('/:sportId', sportController.deleteSport);

module.exports = router;