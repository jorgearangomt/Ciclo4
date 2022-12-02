const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
})

const sport = mongoose.model('sport', dataSchema)
module.exports = sport; 