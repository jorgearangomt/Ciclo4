const sportDAO = require("../database/sportDAO");

const getAllSports = async () => {
  try {
    const allSports = await sportDAO.getAllSports();
    return allSports;
  } catch (error) {
    throw new Error(error);
  }
};

const getSportById = async (id) => {
  try {
    const sport = await sportDAO.getSportById(id);
    return sport;
  } catch (error) {
    throw new Error(error);
  }
};

const createSport = async (sport) => {
  try {
    const savedSport = await sportDAO.createSport(sport);
    return savedSport;
  } catch (error) {
    throw new Error(error);
  }
};

const updateSport = async (id, sport) => {
  try {
    const updatedSport = await sportDAO.updateSport(id, sport);
    return updatedSport;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteSport = async (id) => {
  try {
    await sportDAO.deleteSport(id);
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
