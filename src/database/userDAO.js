const User = require("../database/model/user");

const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};


const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};


const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  }
  catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
