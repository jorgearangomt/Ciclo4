const teamService = require('../services/teamService');

const getAllTeams = async (req, res) => {
  try {
    const allTeams = await teamService.getAllTeams();
    res.status(200).send(allTeams);
  } catch (error) {
    res.status(500).send(error?.status);
    console.log(error?.message || error);
  }
};

const getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await teamService.getTeamById(teamId);
    res.status(200).send(team);
  } catch (error) {
    res.status(500).send(error?.message || error);
  }
};

const createTeam = async (req, res) => {
  try {
    const { body } = req;
    const createdTeam = await teamService.createTeam(body);
    res.status(201).send(createdTeam);
  } catch (error) {
    res.status(500).send(error?.status);
    console.log(error?.message || error);
  }
};

const updateTeam = async (req, res) => {
  try {
    const { body } = req;
    const { teamId } = req.params;
    const updatedTeam = await teamService.updateTeam(teamId, body);
    res.status(200).send(updatedTeam);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    await teamService.deleteTeam(teamId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};