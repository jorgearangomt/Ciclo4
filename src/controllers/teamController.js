const Team = require("../database/model/team");
const mongoose = require("mongoose");

const teamService = require("../services/teamService");
const Sport = require("../database/model/sport");
//Obtener todos los equipos
const getAllTeams = async (req, res) => {
  try {
    const allTeams = await teamService.getAllTeams();
    res.status(200).send(allTeams);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Obtener un equipo por su ID
const getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await teamService.getTeamById(teamId);
    if (!team) {
      res.status(404).send({ message: "Team not found" });
      return;
    }
    res.status(200).send(team);
  } catch (error) {
    res.status(500).send({ message: error?.message } || error);
  }
};

//Crear un equipo
const createTeam = async (req, res) => {
  try {
    const { body } = req;
    const { sport } = body;
    const foundSport = await Sport.findOne({ _id: sport._id });
    if (!foundSport) {
      res.status(404).send({ message: "Sport not found"});
      return;
    }
    const newTeam = new Team({
      _id: new mongoose.Types.ObjectId(),
      ...body,
    })
    await Team.validate(newTeam);
    const createdTeam = await teamService.createTeam(newTeam);
    res.status(201).send(createdTeam);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid team data"});
    }
    else {
      res.status(500).send({ message: error?.message } || error);
    }
  }
};

//Actualizar un equipo
const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { body } = req;
    const { sport } = body;
    const foundSport = await Sport.findOne({ _id: sport._id });
    if (!foundSport) {
      res.status(404).send({ message: "Sport not found"});
      return;
    }
    await Team.validate(body);
    const updatedTeam = await teamService.updateTeam(teamId, body);
    if (updatedTeam === null) {
      res.status(404).send({ message: "Team not found"});
      return;
    }
    res.status(200).send(updatedTeam);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid team data"});
    }
    else {
      res.status(500).send({ message: error?.message } || error);
    }
  }
};

//Eliminar un equipo
const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const deletedTeam = await teamService.deleteTeam(teamId);
    console.log(deletedTeam);
    if (deletedTeam === null) {
      res.status(404).send({ message: "Team not found"});
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      res.status(400).send({ message: "Bad request"});
    }
    else {
      res.status(500).send({ message: error?.message } || error);
    }
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
