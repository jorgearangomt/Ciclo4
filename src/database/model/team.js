const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    validate: [
      {
        //Validar si la propiedad _id es un ObjectID válido de MongoDB
        validator: (id) => {
          return mongoose.Types.ObjectId.isValid(id);
        },
        message: 'El ID proporcionado no es un ObjectID válido de MongoDB.',
      },
    ],
  },
  name: {
    required: true,
    type: String,
    validate: [
      {
        //Validar que el nombre tenga al menos 3 caracteres
        validator: (name) => {
          return name.length >= 3;
        },
        message: "El nombre del equipo debe tener al menos 3 caracteres.",
      },
      {
        //Validar que el nombre solo contenga letras y espacios
        validator: (name) => {
          return /^[a-zA-Z\s]+$/.test(name);
        },
        message: "El nombre del equipo solo puede contener letras y espacios.",
      },
    ],
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
    validate: [
      {
        //Validar que el sport_id proporcionado es un ObjectID válido de MongoDB
        validator: (sport_id) => {
          return mongoose.Types.ObjectId.isValid(sport_id);
        },
        message: 'El sport_id proporcionado no es un ObjectID válido de MongoDB.',
      },
    ],
  },
});

module.exports = mongoose.model('Team', teamSchema);