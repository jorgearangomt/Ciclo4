const Team = require("../database/model/team");

const getAllTeams = async () => {
  try {
    const teams = await Team.find({}).populate("sport");
    return teams;
  } catch (error) {
    throw error;
  }
};

const getTeamById = async (id) => {
  try {
    const team = await Team.findById(id).populate("sport").lean();
    return team;
  } catch (error) {
    throw error;
  }
};

const createTeam = async (team) => {
  try {
    const savedTeam = await team.save();
    return await savedTeam.populate("sport");
  } catch (error) {
    throw error;
  }
};
  

const updateTeam = async (id, team) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, team, {
      new: true,
    }).populate("sport");
    return updatedTeam;
  } catch (error) {
    throw error;
  }
};

const deleteTeam = async (id) => {
  try {
    return await Team.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
