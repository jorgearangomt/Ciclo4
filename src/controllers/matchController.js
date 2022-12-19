const Match = require("../database/model/match");
const User = require("../database/model/user");
const Team = require("../database/model/team");
const mongoose = require("mongoose");

const matchService = require("../services/matchService");

//Obtener todos los usuarios
const getAllMatches = async (req, res) => {
  try {
    const allMatches = await matchService.getAllMatches();
    res.status(200).send(allMatches);
  } catch (error) {
    res.status(500).send({ message: error?.message } || error);
  }
};

//Obtener un usuario por su ID
const getMatchById = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await matchService.getMatchById(matchId);
    if (!match) {
      res.status(404).send("Match not found");
      return;
    }
    res.status(200).send(match);
  } catch (error) {
    res.status(500).send({ message: error?.message } || error);
  }
};

//Crear un usuario
const createMatch = async (req, res) => {
  try {
    const { body } = req;
    const { home_team: homeTeam, away_team: awayTeam, user, winner } = body;

    if (homeTeam._id === awayTeam._id) {
      return res.status(400).send({ message: "Home team and away team cannot be the same"});
    }

    const foundHomeTeam = await Team.findOne({ _id: homeTeam._id });
    const foundAwayTeam = await Team.findOne({ _id: awayTeam._id });
    if (!foundHomeTeam || !foundAwayTeam) {
      return res.status(404).send({ message: "Home team or away team not found"});
    }

    if (homeTeam._id !== winner._id && awayTeam._id !== winner._id) {
      return res.status(400).send({ message: "Winner must be home team or away team" });
    }

    const foundUser = await User.findOne({ _id: user._id });
    if (!foundUser) {
      return res.status(404).send({ message: "User not found"});
    }

    const match = new Match({
      _id: new mongoose.Types.ObjectId(),
      ...body,
    });

    await Match.validate(match);
    const createdMatch = await matchService.createMatch(match);
    return res.status(201).send(createdMatch);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid match data"});
    } else {
      return res.status(500).send({ message: error?.message } || error);
    }
  }
};

//Actualizar un usuario
const updateMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { body } = req;
    const { home_team: homeTeam, away_team: awayTeam, user, winner } = body;

    if (homeTeam._id === awayTeam._id) {
      return res.status(400).send({ message: "Home team and away team cannot be the same"});
    }

    const foundHomeTeam = await Team.findOne({ _id: homeTeam._id });
    const foundAwayTeam = await Team.findOne({ _id: awayTeam._id });
    if (!foundHomeTeam || !foundAwayTeam) {
      return res.status(404).send({ message: "Home team or away team not found"});
    }

    if (homeTeam._id !== winner._id && awayTeam._id !== winner._id) {
      return res.status(400).send({ message: "Winner must be home team or away team"});
    }

    const foundUser = await User.findOne({ _id: user._id });
    if (!foundUser) {
      return res.status(404).send({ message: "User not found"});
    }

    const updatedMatch = await matchService.updateMatch(matchId, body);
    if (updatedMatch === null) {
      res.status(404).send({ message: "Match not found"});
      return;
    }
    return res.status(200).send(updatedMatch);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid match data"});
    } else {
      return res.status(500).send({ message: error?.message } || error);
    }
  }
};


//Eliminar un usuario
const deleteMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const deletedMatch = await matchService.deleteMatch(matchId);
    if (deletedMatch === null) {
      res.status(404).send({ message : "Match not found"});
      return;
    }
    res.status(200).send({ message : "Match deleted"});
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send({ message: error?.message } || error);
      return;
    }
    res.status(500).send({ message: error?.message } || error);
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
};
