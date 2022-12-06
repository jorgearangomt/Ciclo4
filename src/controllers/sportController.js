//Este código contiene las funciones que manejan las rutas de deportes
const Sport = require("../database/model/sport");

const sportService = require("../services/sportService");

//Obtener todos los deportes
const getAllSports = async (req, res) => {
  try {
    const allSports = await sportService.getAllSports();
    res.status(200).send(allSports);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Obtener un deporte por su ID
const getSportById = async (req, res) => {
  try {
    const { sportId } = req.params;
    const sport = await sportService.getSportById(sportId);
    if (!sport) {
      res.status(404).send("Sport not found");
      return;
    }
    res.status(200).send(sport);
  } catch (error) {
    res.status(500).send(error?.message || error);
  }
};

//Crear un deporte
const createSport = async (req, res) => {
  try {
    const { body } = req;
    await Sport.validate(body);
    const createdSport = await sportService.createSport(body);
    res.status(201).send(createdSport);
  } catch (error) {
    res.status(500).send(error?.message || error);
    console.log(error?.message || error);
  }
};

//Actualizar un deporte
const updateSport = async (req, res) => {
  try {
    const { sportId } = req.params;
    const { body } = req;
    await Sport.validate(body);
    const updatedSport = await sportService.updateSport(sportId, body);
    if(updatedSport === null){
      res.status(404).send("Sport not found");
      return;
    }
    res.status(200).send(updatedSport);
  } catch (error) {
    res.status(500).send(error?.message || error);
  }
};

//Eliminar un deporte
const deleteSport = async (req, res) => {
  try {
    const { sportId } = req.params;
    const deletedSport = await sportService.deleteSport(sportId);
    if(deletedSport === null){
      res.status(404).send("Sport not found");
      return;
    }
    res.status(204).send();
  } catch (error) {
    if(error.name === "CastError"){
      res.status(400).send("Invalid sport ID");
    }
    res.status(500).send(error);
  }
};

module.exports = {
  getAllSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport,
};