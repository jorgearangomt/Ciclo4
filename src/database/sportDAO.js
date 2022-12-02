const Sport = require('../database/model/sport');

const getAllSports = async () => {
    return await Sport.find({});
};

const getSportById = () => {};

const createSport = async (sport) => {
    const newSport = new Sport({
        name: sport.name,
    })
    try {
        const sportSaved = await newSport.save();
        return sportSaved;
    } catch (error) {
        console.log(error);
    }
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