const sportService = require("../services/sportService");

const getAllSports = async (req, res) => {
  try {
    const allSports = await sportService.getAllSports();
    res.status(200).send(allSports);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSportById = async (req, res) => {
  try {
    const { sportId } = req.params;
    const sport = await sportService.getSportById(sportId);
    res.status(200).send(sport);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createSport = async (req, res) => {
  try {
    const { body } = req;
    const createdSport = await sportService.createSport(body);
    res.status(201).send(createdSport);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateSport = async (req, res) => {
  try {
    const { body } = req;
    const { sportId } = req.params;
    const updatedSport = await sportService.updateSport(sportId, body);
    res.status(200).send(updatedSport);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteSport = async (req, res) => {
  try {
    const { sportId } = req.params;
    await sportService.deleteSport(sportId);
    res.status(204).send();
  } catch (error) {
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
