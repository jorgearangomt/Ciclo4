const Sport = require('../database/model/sport');
const sportDAO = require('../database/sportDAO');


const getAllSports = () => {};
const getSportById = () => {};
const createSport = async (sport) => {
    const newSport = new Sport({
        name: sport.name,
    })
    const savedSport = await sportDAO.createSport(newSport);
    console.log(savedSport);
    return savedSport;
};
const updateSport = () => {};
const deleteSport = () => {};

module.exports = {
    getAllSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport
}