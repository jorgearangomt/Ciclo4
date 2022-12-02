const Sport = require("../database/model/sport");

const getAllSports = async () => {
  try {
    const sports = await Sport.find({});
    return sports;
  } catch (error) {
    throw new Error(error);
  }
};

const getSportById = async (id) => {
  try {
    const sport = await Sport.findById(id);
    return sport;
  } catch (error) {
    throw new Error(error);
  }
};

const createSport = async (sport) => {
  try {
    const newSport = new Sport({
      name: sport.name,
    });
    const savedSport = await newSport.save();
    return savedSport;
  } catch (error) {
    throw new Error(error);
  }
};

const updateSport = async (id, sport) => {
  try {
    const updatedSport = await Sport.findByIdAndUpdate(id, sport, {
      new: true,
    });
    return updatedSport;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteSport = async (id) => {
  try {
    await Sport.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport,
};
