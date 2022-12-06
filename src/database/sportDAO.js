//Este código contiene las funciones de acceso a datos de deportes
const Sport = require("../database/model/sport");
const mongoose = require("mongoose");
//Obtener todos los deportes
const getAllSports = async () => {
  try {
    const sports = await Sport.find({});
    return sports;
  } catch (error) {
    throw error;
  }
};

//Obtener un deporte por su ID
const getSportById = async (id) => {
  try {
    const sport = await Sport.findById(id);
    return sport;
  } catch (error) {
    throw error;
  }
};

//Crear un deporte
const createSport = async (sport) => {
  try {
    const newSport = new Sport({
      _id: new mongoose.Types.ObjectId(),
      name: sport.name,
    });
    console.log(newSport);
    const savedSport = await newSport.save();
    return savedSport;
  } catch (error) {
    throw error;
  }
};

//Actualizar un deporte
const updateSport = async (id, sport) => {
  try {
    const updatedSport = await Sport.findByIdAndUpdate(id, sport, {
      new: true,
    });
    return updatedSport;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Eliminar un deporte
const deleteSport = async (id) => {
  try {
    return await Sport.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport,
};