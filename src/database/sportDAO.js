const Sport = require('../database/model/sport');

const getAllSports = async () => {
    return await Sport.find({});
};

const getSportById = async(id) => {
    return await Sport.findById(id).exec();
};

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

const updateSport = async (id,sport) => {
    try {
        const isUpdated = await Sport.updateOne({_id:id},sport);
        if(isUpdated){
            return await Sport.findById(id).exec();
        }
        return {};
    } catch (error) {
        console.log(error);
    }
};

const deleteSport = async (id) => {
    try {
        await Sport.deleteOne({_id:id})
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport
}