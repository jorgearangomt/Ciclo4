//Este código contiene las funciones de servicio para manejar la lógica de negocio de los deportes
const sportDAO = require("../database/sportDAO");

//Obtener todos los deportes
const getAllSports = async () => {
  try {
    const allSports = await sportDAO.getAllSports();
    return allSports;
  } catch (error) {
    throw new Error(error);
  }
};

//Obtener un deporte por su ID
const getSportById = async (id) => {
  try {
    const sport = await sportDAO.getSportById(id);
    return sport;
  } catch (error) {
    throw new Error(error);
  }
};

//Crear un deporte
const createSport = async (sport) => {
  try {
    const savedSport = await sportDAO.createSport(sport);
    return savedSport;
  } catch (error) {
    throw new Error(error);
  }
};

//Actualizar un deporte
const updateSport = async (id, sport) => {
  try {
    const updatedSport = await sportDAO.updateSport(id, sport);
    return updatedSport;
  } catch (error) {
    throw new Error(error);
  }
};

//Eliminar un deporte
const deleteSport = async (id) => {
  try {
    return await sportDAO.deleteSport(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport,
};
