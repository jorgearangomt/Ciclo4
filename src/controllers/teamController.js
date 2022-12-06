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
      res.status(404).send("Team not found");
      return;
    }
    res.status(200).send(team);
  } catch (error) {
    res.status(500).send(error?.message || error);
  }
};

//Crear un equipo
const createTeam = async (req, res) => {
  try {
    const { body } = req;
    const foundSport = await Sport.findOne({ name: body.sport.name });
    if (!foundSport) {
      res.status(404).send("Sport not found");
      return;
    }
    const newTeam = new Team({
      _id: new mongoose.Types.ObjectId(),
      name: body.name,
      sport: foundSport._id,
    })
    await Team.validate(newTeam);
    const createdTeam = await teamService.createTeam(newTeam);
    const response = { 
      _id: createdTeam._id,
      name: createdTeam.name,
      sport: foundSport.name 
    };
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error?.message || error);
    console.log(error?.message || error);
  }
};

//Actualizar un equipo
const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { body } = req;
    const foundSport = await Sport.findOne({ name: body.sport.name });
    if (!foundSport) {
      res.status(404).send("Sport not found");
      return;
    }
    const parsedTeam = new Team({
      name: body.name,
      sport: foundSport._id,
    })
    await Team.validate(parsedTeam);
    const updatedTeam = await teamService.updateTeam(teamId, parsedTeam);
    if(updatedTeam === null) {
      res.status(404).send("Team not found");
      return;
    }
    const response = {
      _id: updatedTeam._id,
      name: updatedTeam.name,
      sport: foundSport.name
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error?.message || error);
    console.log(error?.message || error);
  }
};

//Eliminar un equipo
const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    
    const deletedTeam = await teamService.deleteTeam(teamId);
    console.log(deletedTeam);
    if (deletedTeam === null) {
      res.status(404).send("Team not found");
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    if(error.name === "CastError") {
      res.status(400).send("Bad request");
    }
    else{
      res.status(500).send(error);
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
