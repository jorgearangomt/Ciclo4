const Match = require("../database/model/match");

const getAllMatches = async () => {
  try {
    const match = await Match.find({}).populate("home_team").populate("away_team").populate("winner").populate("user");
    return match;
  } catch (error) {
    throw error;
  }
};

const getMatchById = async (id) => {
  try {
    const match = await Match.findById(id).populate("home_team").populate("away_team").populate("winner").populate("user");
    return match;
  } catch (error) {
    throw error;
  }
};

const createMatch = async(match) => {
  try {
    const savedMatch = await match.save();
    return await savedMatch.populate(["home_team", "away_team", "winner", "user"]);
  } catch (error) {
    throw error;
  }
};

const updateMatch = async (id, match) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(id, match, {
      new: true,
    }).populate("home_team").populate("away_team").populate("winner").populate("user");
    return updatedMatch;
  } catch (error) {
    throw error;
  }
};

const deleteMatch = async (id) => {
  try {
    return await Match.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
