const sportService = require("../services/sportService");

const getAllSports = async (req, res) => {
  const allSports = await sportService.getAllSports();
  res.status(200).send(allSports);
};

const getSportById = async (req, res) => {
  const {sportId} = req.params;
  const sport = await sportService.getSportById(sportId);
  res.status(200).send(sport);
};

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
