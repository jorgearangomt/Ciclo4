const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
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
    type: String,
    required: true,
    validate: [
      {
        //Validar que el nombre tenga al menos 3 caracteres
        validator: (name) => {
          return name.length >= 3;
        },
        message: "El nombre del equipo debe tener al menos 3 caracteres.",
      },
      {
        //Validar que el nombre solo contenga letras y espacios y numeros
        validator: (name) => {
          return /^[a-zA-Z\s0-9]+$/.test(name);
        },
        message: "El nombre del deporte solo puede contener letras, espacios y numeros.",
      },
    ],
  },
  date: {
    type: Date,
    required: true
  },
  home_team: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
    required: true,
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
  away_team: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
    required: true,
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
  home_score: {
    type: Number,
    required: true
  },
  away_score: {
    type: Number,
    required: true
  },
  winner: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
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
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["scheduled", "in progress", "completed"]
  }
},{timestamps: true});

module.exports = mongoose.model("Match", matchSchema);