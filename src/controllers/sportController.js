const Sport = require("../database/model/sport");

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
    if(!sport) {
      res.status(404).send("Sport not found");
      return;
    }
    res.status(200).send(sport);
  } catch (error) {
    res.status(500).send(error?.message || error);
  }
};

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

const updateSport = async (req, res) => {
  try {
    const { sportId } = req.params;
    const { body } = req;
    // const body = {...req.body, _id: sportId};
    // await Sport.validate(body);
    const updatedSport = await sportService.updateSport(sportId, body);
    res.status(200).send(updatedSport);
  } catch (error) {
    res.status(500).send(error?.message || error);
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
