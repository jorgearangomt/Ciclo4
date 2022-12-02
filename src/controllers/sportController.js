const sportService = require("../services/sportService");

const getAllSports = (req, res) => {};

const getSportById = (req, res) => {};
const createSport = async (req, res) => {
  const { body } = req;
  const createdSport = await sportService.createSport(body);
  res.status(201).send(createdSport);
};
const updateSport = (req, res) => {};
const deleteSport = (req, res) => {};

module.exports = {
  getAllSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport
};
