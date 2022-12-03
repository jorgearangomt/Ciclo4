const Team = require("../database/model/team");
const Sport = require("../database/model/sport");

const getAllTeams = async () => {
  try {
    const teams = await Team.find({}).populate("sport");
    return teams;
  } catch (error) {
    throw new Error(error);
  }
};

const getTeamById = async (id) => {
  try {
    const team = await Team.findById(id).populate("sport");
    return team;
  } catch (error) {
    throw new Error(error);
  }
};

const createTeam = async (team) => {
  try {
    const foundSport = await Sport.findOne({name: team.sport.name});
    console.log(foundSport);
    const newTeam = new Team({
      name: team.name,
      sport: foundSport._id
    });
    const savedTeam = await newTeam.save();
    return savedTeam;
  } catch (error) {
    throw new Error(error);
  }
};
  

const updateTeam = async (id, team) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, team, {
      new: true,
    });
    return updatedTeam;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTeam = async (id) => {
  try {
    await Team.findByIdAndDelete(id);
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
