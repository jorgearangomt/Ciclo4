const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
        message: "El nombre del deporte debe tener al menos 3 caracteres.",
      },
      {
        //Validar que el nombre solo contenga letras y espacios
        validator: (name) => {
          return /^[a-zA-Z\s]+$/.test(name);
        },
        message: "El nombre del deporte solo puede contener letras y espacios.",
      },
    ],
  },
  password: {
    type: String,
    validate: [
      {
        //Validar que el nombre tenga al menos 8 caracteres
        validator: (password) => {
          const passwordRegex =  /^.{8,}$/;
          return passwordRegex.test(password);
        },
        message: "La contraseña debe tener al menos 8 caracteres.",
      },
    ],
  },
  email: {
    required: true,
    type: String,
    match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true,
    lowercase: true,
    trim: true,
    message: 'Ingrese un email valido',
  },
});

//Exportar modelo de datos
module.exports = mongoose.model("User", userSchema);