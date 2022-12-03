const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    validate: [
        {
            validator: (id) => {
                // Check if the _id property is a valid MongoDB ObjectID
                return mongoose.Types.ObjectId.isValid(id);
            },
            message: 'The provided _id is not a valid MongoDB ObjectID.',
        },
    ],
},
  name: {
    required: true,
    type: String,
    validate: [
      {
        validator: (name) => {
          // Check if the name is at least 3 characters long
          return name.length >= 3;
        },
        message: "Sport name must be at least 3 characters long.",
      },
      {
        validator: (name) => {
          // Check if the name only contains letters and spaces
          return /^[a-zA-Z\s]+$/.test(name);
        },
        message: "Sport name can only contain letters and spaces.",
      },
    ],
  },
});

module.exports = mongoose.model("Sport", sportSchema);
