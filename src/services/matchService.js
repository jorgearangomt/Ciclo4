const matchDAO = require("../database/matchDAO");

const getAllMatches = async () => {
  try {
    const allMatches = await matchDAO.getAllMatches();
    return allMatches;
  } catch (error) {
    throw error;
  }
};

const getMatchById = async (id) => {
  try {
    const match = await matchDAO.getMatchById(id);
    return match;
  } catch (error) {
    throw error;
  }
};

const createMatch = async (match) => {
  try {
    const savedMatch = await matchDAO.createMatch(match);
    return savedMatch;
  } catch (error) {
    throw error;
  }
};

const updateMatch = async (id, match) => {
  try {
    const updatedMatch = await matchDAO.updateMatch(id, match);
    return updatedMatch;
  } catch (error) {
    throw error;
  }
};

const deleteMatch = async (id) => {
  try {
    return await matchDAO.deleteMatch(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};