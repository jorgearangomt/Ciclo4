const sportDAO = require('../database/sportDAO');

const getAllSports = async () => {
    const allSports = await sportDAO.getAllSports();
    return allSports;
};

const getSportById = async (id) => {
    const sport = await sportDAO.getSportById(id);
    return sport;
};

const createSport = async (sport) => {
    const savedSport = await sportDAO.createSport(sport);
    console.log(savedSport);
    return savedSport;
};

const updateSport = async (id,sport) => {
    const updatedSport = await sportDAO.updateSport(id,sport);
    return updatedSport;
};
const deleteSport = () => {};

module.exports = {
    getAllSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport
}