const userDAO = require("../database/userDAO");

const getAllUsers = async () => {
  try {
    const allUsers = await userDAO.getAllUsers();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await userDAO.getUserById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const isExist = await userDAO.getUserByEmail(user.email);
    if (isExist) {
      throw Object.assign(new Error("User with that email already exists"),
        { name: "EmailExistError" });
    }
    const savedUser = await userDAO.createUser(user);
    return savedUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, user) => {
  try {
    const updatedUser = await userDAO.updateUser(id, user);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    return await userDAO.deleteUser(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};