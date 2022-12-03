const teamDAO = require("../database/teamDAO");

const getAllTeams = async () => {
  try {
    const allTeams = await teamDAO.getAllTeams();
    return allTeams;
  } catch (error) {
    throw new Error(error);
  }
};

const getTeamById = async (id) => {
  try {
    const team = await teamDAO.getTeamById(id);
    return team;
  } catch (error) {
    throw new Error(error);
  }
};

const createTeam = async (team) => {
  try {
    const savedTeam = await teamDAO.createTeam(team);
    return savedTeam;
  } catch (error) {
    throw new Error(error);
  }
};

const updateTeam = async (id, team) => {
  try {
    const updatedTeam = await teamDAO.updateTeam(id, team);
    return updatedTeam;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTeam = async (id) => {
  try {
    await teamDAO.deleteTeam(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};