const getAllSports = () => {};
const getSportById = () => {};
const createSport = async (sport) => {
    try {
        const sportSaved = await sport.save();
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